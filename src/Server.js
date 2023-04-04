/** This file is the main file that start the server and manages it */
/* eslint-disable no-unsafe-finally */

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
const VersionToProtocol = require("./utils/VersionToProtocol");

const ServerInfo = require("./api/ServerInfo");
const PlayerInfo = require("./api/PlayerInfo");
const Frog = require('./Frog')

const GarbageCollector = require("./utils/GarbageCollector");
const ValidateClient = require("./player/ValidateClient");
const PlayerInit = require("./server/PlayerInit");

const DefaultWorld = require("./world/DefaultWorld");

const Logger = require("./server/Logger");

const PluginLoader = require("./plugins/PluginLoader");
const ResponsePackInfo = require("./network/packets/ServerResponsePackInfoPacket");

const { RateLimitError } = require("./utils/exceptions/RateLimitException");

const FrogProtocol = require("frog-protocol");

const assert = require("assert");

const path = require("path");
const fs = require("fs");

process.env.DEBUG = Frog.isDebug ? "minecraft-protocol" : "";

let server = null;
let config = null;
let lang = null;

/**
 * This function executes when something is off with the server
 * 
 * @private
 * @param {Error} err 
 */
async function _handleCriticalError(err) {
	if (err.toString().includes("Server failed to start")) {
		Logger.error(lang.errors.failedToBind.replace("%address%", `${config.host}:${config.port}`));
		Logger.error(lang.errors.otherServerRunning);
		process.exit(config.crashCode);
	}

	Logger.error(`Server error: ${err.stack}`);

	if (!config.unstable) {
		process.exit(config.crashCode);
	}
}


/**
 * Loads config & lang files into the server
 *  
 * @private
 */
async function _initJson() {
	config = ServerInfo.config;
	lang = ServerInfo.lang;
}

/**
 * Handles packets
 * 
 * @param {Client} client 
 * @param {JSON} packetParams 
 */
async function _handlePacket(client, packetParams) {
	if (client.offline) return;

	const packetsDir = path.join(__dirname, "network", "packets");

	let exist = false;

	fs.readdirSync(packetsDir).forEach((filename) => {
		if (filename.startsWith("Client") && filename.endsWith(".js")) {
			const packetPath = path.join(packetsDir, filename);
			try {
				if (++client.packetCount > 2000) {
					Frog.eventEmitter.emit('packetRateLimitReached', {
						player: client,
						server: this,
						cancel() {
							return true;
						},
					});
					throw new RateLimitError(`Too many packets from ${client.username} (${client.packetCount})`);
				}

				const packet = new (require(packetPath))();
				if (packet.getPacketName() === packetParams.data.name) {
					let shouldReadPacket = true;

					Frog.eventEmitter.emit('packetRead', {
						player: client,
						data: packet.data,
						server: this,
						cancel() {
							return false;
						},
					});

					if (shouldReadPacket) {
						packet.readPacket(client, packetParams, this);
					}
					exist = true;
				}
			} catch (e) {
				client.kick(lang.kickmessages.invalidPacket);
				Frog.eventEmitter.emit('packetReadError', {
					player: client,
					error: e,
					server: this,
					cancel() {
						return false;
					},
				});
				Logger.error(`${lang.errors.packetHandlingException.replace("%player%", client.username).replace("%error%", e.stack)}`);
			}
		}
	});

	if (!exist && config.logUnhandledPackets) {
		Logger.warning(lang.devdebug.unhandledPacket);
		console.info("%o", packetParams);
	}
}

/**
 * It logs a warning if the config.debug or config.unstable is true.
 * 
 * @private
 */
async function _initDebug() {
	if (config.unstable) Logger.warning(lang.devdebug.unstableWarning);
	if (Frog.isDebug) Logger.debug(lang.errors.debugWarning);
}

/**
 * Listens the server
 * 
 * @private
 */
async function _listen() {
	const { host, port, version, offlineMode: offline, maxPlayers, motd } = config;

	try {
		FrogProtocol.createServer({
			host,
			port,
			version,
			offline,
			maxPlayers,
			motd: {
				motd: motd,
				levelName: "GreenFrog",
			},
		}).on("connect", (client) => {
			client.on("join", () => {
				Frog.eventEmitter.emit('playerPreConnectEvent', {
					player: client,
					server: this,
					cancel(reason = "Server requested disconnect.") {
						client.disconnect(reason)
					},
				});

				client.__queue = client.queue
				client.queue = (packetName, data) => {
					let shouldQueue = true
					Frog.eventEmitter.emit('packetQueueEvent', {
						player: client,
						server: this,
						packetName,
						packetData: data,
						cancel() {
							shouldQueue = false
						},
					});

					if (shouldQueue) client.__queue(packetName, data)
				}

				_onJoin(client);
			});

			client.on("packet", (packet) => {
				try {
					_handlePacket(client, packet);
				} catch (e) {
					client.kick(lang.kickmessages.invalidPacket);

					Logger.error(`${lang.errors.packetHandlingException.replace("%player%", client.username).replace("%error%", e.stack)}`);
				}
			});
		});

		Logger.info(`${lang.server.listeningOn.replace(`%address%`, `/${host}:${port}`)}`);
	} catch (e) {
		Logger.error(`${lang.errors.listeningFailed.replace(`%address%`, `/${host}:${port}`).replace("%error%", e.stack)}`);
		process.exit(config.exitCode);
	}
}


/**
 * Executes, when player joins the server
 * 
 * @param {Client} client
 * @private
 */
async function _onJoin(client) {
	await PlayerInit._initPlayer(client, server);
	await ValidateClient._initAndValidateClient(client);

	client.world = null; // This gets initialised in PlayerResourcePacksCompletedEvent
	Object.assign(client, { x: 0, y: 0, z: 0 }); // Player coordinates
	Object.assign(client, { health: 20, hunger: 20, chunksEnabled: true, packetCount: 0 }); // Network stuff
	Object.assign(client, { dead: false, offline: false, initialised: false, isConsole: true, fallDamageQueue: 0 }); // API fields

	setInterval(() => {
		client.packetCount = 0;
	}, 1000);

	Frog.eventEmitter.emit('playerConnect', {
		player: client,
		server: this,
		cancel(reason = "") {
			client.kick(reason)
		},
	});

	PlayerInfo.addPlayer(client);

	if (PlayerInfo.players.length > config.maxPlayers) {
		Frog.eventEmitter.emit('playerMaxPlayersDisconnect', {
			player: client,
			server: this,
			onlinePlayers: PlayerInfo.players.length,
			maxPlayers: config.maxPlayers,
			cancel(reason = "") {
				client.kick(reason)
			},
		});
		client.kick(lang.kickmessages.serverFull);
		return;
	}

	if (!(client.version === VersionToProtocol.getProtocol(config.version)) && !config.multiProtocol) {
		Frog.eventEmitter.emit('playerVersionMismatchDisconnect', {
			player: client,
			server: this,
			serverVersion: config.version,
			clientProtocol: client.version,
			serverProtocol: VersionToProtocol.getProtocol(config.version),
			cancel(reason = "") {
				client.kick(reason)
			},
		});

		client.kick(lang.kickmessages.versionMismatch.replace("%version%", config.version));
		return;
	}

	const responsepackinfo = new ResponsePackInfo();
	responsepackinfo.setMustAccept(true);
	responsepackinfo.setHasScripts(false);
	responsepackinfo.setBehaviorPacks([]);
	responsepackinfo.setTexturePacks([]);
	responsepackinfo.writePacket(client);
}

module.exports = {
	/** Config as JSON */
	config: config,
	/** Language as JSON */
	lang: lang,

	/**
	 * It loads the config, lang files, and commands, then loads the plugins and starts the server.
	 */
	async start() {
		await _initJson();

		await assert(parseInt(config.garbageCollectorDelay), NaN);
		await assert(parseInt(config.randomTickSpeed), NaN);

		if (!fs.existsSync("ops.yml")) {
			fs.writeFile("ops.yml", "", (err) => {
				if (err) throw err;
			});
		}

		if (!fs.existsSync("world")) fs.mkdirSync("world");

		console.clear()

		Logger.info(lang.server.loadingServer);
		Logger.info(lang.commands.verInfo.replace("%version%", ServerInfo.minorServerVersion));

		process.on("uncaughtException", (err) => _handleCriticalError(err));
		process.on("uncaughtExceptionMonitor", (err) => _handleCriticalError(err));
		process.on("unhandledRejection", (err) => _handleCriticalError(err));

		await _initDebug();

		PluginLoader.loadPlugins();

		await _listen();

		setInterval(() => {
			GarbageCollector.gc();
		}, parseInt(config.garbageCollectorDelay));

		setInterval(() => {
			const serverLocalWorld = new DefaultWorld();
			serverLocalWorld.tick();
		}, parseInt(config.randomTickSpeed));
	},
};
