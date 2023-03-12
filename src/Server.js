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
const bedrock = require("frog-protocol");
const ServerInfo = require("./server/ServerInfo");
const PlayerInfo = require("./player/PlayerInfo");
const PluginLoader = require("./plugin/PluginLoader");
const Text = require("./network/packets/handlers/Text");
const Interact = require("./network/packets/handlers/Interact");
const ResponsePackInfo = require("./network/packets/ResponsePackInfo");
const ClientContainerClose = require("./network/packets/handlers/ClientContainerClose");
const ResourcePackClientResponse = require("./network/packets/handlers/ResourcePackClientResponse");
const ServerInternalServerErrorEvent = require("./plugin/events/ServerInternalServerErrorEvent");
const InventoryTransaction = require("./network/packets/handlers/InventoryTransaction");
const ModalFormResponse = require("./network/packets/handlers/ModalFormResponse");
const ItemStackRequest = require("./network/packets/handlers/ItemStackRequest");
const CommandRequest = require("./network/packets/handlers/CommandRequest");
const PlayerMove = require("./network/packets/handlers/PlayerMove");
const PlayerJoinEvent = require("./plugin/events/PlayerJoinEvent");
const VersionToProtocol = require("./server/VersionToProtocol");
const GarbageCollector = require("./server/GarbageCollector");
const ValidateClient = require("./player/ValidateClient");
const DefaultWorld = require("./world/DefaultWorld");
const PlayerInit = require("./server/PlayerInit");
const Logger = require("./server/Logger");
const assert = require('assert');

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
	_handlepk(client, packet) {
		if (client.offline) throw new Error(lang.errors.packetErrorOffline);
		switch (packet.data.name) {
			case "resource_pack_client_response":
				new ResourcePackClientResponse().handle(client, packet, this.server);
				break;
			case "move_player":
				new PlayerMove().handle(client, packet);
				break;
			case "item_stack_request":
				new ItemStackRequest().handle(client, packet);
				break;
			case "interact":
				new Interact().handle(packet, client);
				break;
			case "container_close":
				new ClientContainerClose().handle(client);
				break;
			case "text":
				new Text().handle(client, packet);
				break;
			case "command_request":
				new CommandRequest().handle(client, packet);
				break;
			case "modal_form_response":
				new ModalFormResponse().handle(this.server, client, packet);
				break;
			case "inventory_transaction":
				new InventoryTransaction().handle(this.server, client, packet);
				break;
			default:
				if (config.logUnhandledPackets) {
					Logger.warning(lang.devdebug.unhandledPacket);
					console.info("%o", packet);
				}
				break;
		}
	},

	/**
	 * @private
	 */
	async _onJoin(client) {
		await PlayerInit._initPlayer(client);
		await ValidateClient._initAndValidateClient(client);

		const event = new PlayerJoinEvent();
		event.execute(server, client);

		PlayerInfo.addPlayer(client);

		client.chunksEnabled = true

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
		responsepackinfo.send(client);

		client.offline = false;
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

		await assert(parseInt(config.garbageCollectorDelay), NaN)
		await assert(parseInt(config.randomTickSpeed), NaN)

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
			serverLocalWorld.tick()
		}, parseInt(config.randomTickSpeed))
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
						try {
							client.kick(lang.kickmessages.internalServerError);
						} catch (e) {
							client.disconnect(lang.kickmessages.internalServerError);
						}

						new ServerInternalServerErrorEvent().execute(server, e);
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
