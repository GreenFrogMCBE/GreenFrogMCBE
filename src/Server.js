/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
process.env.DEBUG = process.argv.includes("--debug") ? "minecraft-protocol" : "";

const fs = require("fs");
const path = require("path");
const bedrock = require("frog-protocol");
const ServerInfo = require("./api/ServerInfo");
const PlayerInfo = require("./api/PlayerInfo");
const PluginLoader = require("./plugins/PluginLoader");
const ResponsePackInfo = require("./network/packets/ServerResponsePackInfoPacket");
const ServerInternalServerErrorEvent = require("./events/ServerInternalServerErrorEvent");
const PlayerConnectionCreateEvent = require("./events/PlayerConnectionCreateEvent");
const VersionToProtocol = require("./utils/VersionToProtocol");
const GarbageCollector = require("./utils/GarbageCollector");
const ValidateClient = require("./player/ValidateClient");
const DefaultWorld = require("./world/DefaultWorld");
const PlayerInit = require("./server/PlayerInit");
const Logger = require("./server/Logger");
const assert = require("assert");

let clients = [];
let server = null;
let config = null;
let lang = null;

module.exports = {
	clients: clients,
	server: server,
	config: config,
	lang: lang,

	/**
	 * @private
	 */
	async _initJson() {
		config = ServerInfo.config;
		lang = ServerInfo.lang;
	},

	/**
	 * @private
	 */
	async _handleCriticalError(err) {
		if (err.toString().includes("Server failed to start")) {
			Logger.error(lang.errors.failedToBind.replace("%address%", `${config.host}:${config.port}`));
			Logger.error(lang.errors.otherServerRunning);
			process.exit(config.crashCode);
		} else {
			Logger.error(`Server error: \n${err.stack}`);
			if (!config.unstable) process.exit(config.crashCode);
		}
	},

	/**
	 * @private
	 */
	async _handlepk(client, packetparams, server) {
		if (client.offline) {
			throw new Error(lang.errors.packetErrorOffline);
		}

		const packetsDir = path.join(__dirname, "network", "packets");

		let exist = false;

		fs.readdirSync(packetsDir).forEach((filename) => {
			if (filename.startsWith("Client")) {
				const packetPath = path.join(packetsDir, filename);
				try {
					const packetPathImport = require(packetPath);
					const packet = new packetPathImport();
					if (packet.getPacketName() === packetparams.data.name) {
						packet.readPacket(client, packetparams, server);
						exist = true;
					}
				} catch (e) {
					client.kick(lang.kickmessages.invalidPacket);

					const internalerrorevent = new ServerInternalServerErrorEvent();
					internalerrorevent.server = this;
					internalerrorevent.error = e;
					internalerrorevent.execute();

					Logger.error(`${lang.errors.packetHandlingException.replace("%player%", client.username).replace("%error%", e.stack)}`);
				}
			}
		});

		if (!exist && config.logUnhandledPackets) {
			Logger.warning(lang.devdebug.unhandledPacket);
			console.info("%o", packetparams);
		}
	},

	/**
	 * @private
	 */
	async _onJoin(client) {
		await PlayerInit._initPlayer(client);
		await ValidateClient._initAndValidateClient(client);

		client.world = null // This gets initialised in PlayerResourcePacksCompletedEvent
		Object.assign(client, { x: 0, y: 0, z: 0 }) // Player coordinates
		Object.assign(client, { health: 20, chunksEnabled: true }) // Network stuff
		Object.assign(client, { dead: false, offline: false }) // API fields

		const playerConnectionEvent = new PlayerConnectionCreateEvent();
		playerConnectionEvent.server = this;
		playerConnectionEvent.client = client;
		playerConnectionEvent.execute(server, client);

		PlayerInfo.addPlayer(client);

		if (PlayerInfo.players.length > config.maxPlayers) {
			client.kick(lang.kickmessages.serverFull);
			return;
		}

		if (!(client.version === VersionToProtocol.getProtocol(config.version)) && !config.multiProtocol) {
			client.kick(lang.kickmessages.versionMismatch.replace("%version%", config.version));
			return;
		}

		const responsepackinfo = new ResponsePackInfo();
		responsepackinfo.setMustAccept(true);
		responsepackinfo.setHasScripts(false);
		responsepackinfo.setBehaviorPacks([]);
		responsepackinfo.setTexturePacks([]);
		responsepackinfo.writePacket(client);
	},

	/**
	 * It logs a warning if the config.debug or config.unstable is true.
	 * @private
	 */
	async _initDebug() {
		if (config.unstable) Logger.warning(lang.devdebug.unstableWarning);
		if (process.env.DEBUG === "minecraft-protocol" || config.debug) Logger.debug(lang.errors.debugWarning);
	},

	/**
	 * It loads the config, lang files, and commands, then loads the plugins and starts the server.
	 */
	async start() {
		await this._initJson();

		await assert(parseInt(config.garbageCollectorDelay), NaN);
		await assert(parseInt(config.randomTickSpeed), NaN);

		if (!fs.existsSync("ops.yml")) {
			fs.writeFile("ops.yml", "", (err) => {
				if (err) throw err;
			});
		}

		if (!fs.existsSync("world")) fs.mkdirSync("world");

		Logger.info(lang.server.loadingServer);
		Logger.info(lang.commands.verInfo.replace("%version%", ServerInfo.minorServerVersion));

		process.on("uncaughtException", (err) => this._handleCriticalError(err));
		process.on("uncaughtExceptionMonitor", (err) => this._handleCriticalError(err));
		process.on("unhandledRejection", (err) => this._handleCriticalError(err));

		await this._initDebug();

		await PluginLoader.loadPlugins();

		this._listen();

		setInterval(() => {
			GarbageCollector.gc();
		}, parseInt(config.garbageCollectorDelay));

		setInterval(() => {
			const serverLocalWorld = new DefaultWorld();
			serverLocalWorld.tick();
		}, parseInt(config.randomTickSpeed));
	},

	/**
	 * @private
	 */
	_listen() {
		const { host, port, version, offlineMode: offline, maxPlayers, motd } = config;

		try {
			const server = bedrock.createServer({
				host,
				port,
				version,
				offline,
				maxPlayers,
				motd: {
					motd: motd,
					levelName: "GreenFrogMCBE",
				},
			});

			Logger.info(`${lang.server.listeningOn.replace(`%address%`, `/${host}:${port}`)}`);

			server.on("connect", (client) => {
				client.on("join", () => {
					this._onJoin(client);
				});

				client.on("packet", (packet) => {
					try {
						this._handlepk(client, packet);
					} catch (e) {
						client.kick(lang.kickmessages.invalidPacket);

						const internalerrorevent = new ServerInternalServerErrorEvent();
						internalerrorevent.server = this;
						internalerrorevent.error = e;
						internalerrorevent.execute();
						Logger.error(`${lang.errors.packetHandlingException.replace("%player%", client.username).replace("%error%", e.stack)}`);
					}
				});
			});
		} catch (e) {
			Logger.error(`${lang.errors.listeningFailed.replace(`%address%`, `/${host}:${port}`).replace("%error%", e.stack)}`);
			process.exit(config.exitCode);
		}
	},

	/**
	 * Shutdowns the server.
	 */
	async shutdown() {
		await require("./server/ConsoleCommandSender").close();
		Logger.info(lang.server.stoppingServer);

		try {
			for (const player of PlayerInfo.players) {
				if (!player.offline) player.kick(lang.kickmessages.serverShutdown);
			}
		} catch (e) {
			/* ignored */
		}

		setTimeout(() => {
			PluginLoader.unloadPlugins();
		}, 1000);
	},
};
