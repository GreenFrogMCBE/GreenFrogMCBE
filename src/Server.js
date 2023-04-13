/** This file is the main file that start the server and manages it */

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

/* eslint-disable no-unsafe-finally */

const VersionToProtocol = require("./utils/VersionToProtocol");

const PlayerInfo = require("./api/player/PlayerInfo");
const Frog = require('./Frog')

const GarbageCollector = require("./utils/GarbageCollector");
const PlayerInit = require("./server/PlayerInit");

const World = require("./world/World");

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
let config = Frog.serverConfigurationFiles.config;
let lang = Frog.serverConfigurationFiles.lang;
let isDebug = Frog.isDebug;

/**
 * This function executes when something is off with the server
 * 
 * @async
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
 * Handles packets
 * 
 * @async
 * @param {Client} client 
 * @param {JSON} packetParams 
 * @throws {RateLimitError} - In case if the client is ratelimited
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
 * Logs a warning if the debug or unstable mode is enabled.
 * 
 * @private
 * @async
 */
async function _initDebug() {
	if (config.unstable) Logger.warning(lang.devdebug.unstableWarning);
	if (isDebug) Logger.debug(lang.errors.debugWarning);
}

/**
 * Listens the server
 * 
 * @private
 * @async
 */
async function _listen() {
	const { host, port, version, offlineMode: offline, maxPlayers, motd } = config;

	try {
		server = FrogProtocol.createServer({
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

						return true;
					},
				});

				client.__queue = client.queue
				client.queue = (packetName, data) => {
					let shouldQueue = true
					Frog.eventEmitter.emit('packetQueue', {
						player: client,
						server: this,
						packetName,
						packetData: data,
						cancel() {
							shouldQueue = false

							return true;
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

		Frog.setServer(server)

		Logger.info(`${lang.server.listeningOn.replace(`%address%`, `/${host}:${port}`)}`);
	} catch (e) {
		Logger.error(`${lang.errors.listeningFailed.replace(`%address%`, `/${host}:${port}`).replace("%error%", e.stack)}`);
		process.exit(config.exitCode);
	}
}


/**
 * Executes, when player joins the server
 * 
 * @async
 * @param {Client} client
 * @private
 */
async function _onJoin(client) {
	await PlayerInit.initPlayer(client, server);

	Object.assign(client, { items: [] }); // Inventory
	Object.assign(client, { x: 0, y: 0, z: 0 }); // Player coordinates
	Object.assign(client, { health: 20, hunger: 20, packetCount: 0 }); // API
	Object.assign(client, { world: null, chunksEnabled: true, gamemode: Frog.serverConfigurationFiles.config }); // World-related stuff
	Object.assign(client, { dead: false, offline: false, initialised: false, isConsole: true, fallDamageQueue: 0 }); // More API stuff
	Object.assign(client, { ip: client.connection.address.split("/")[0], port: client.connection.address.split("/")[0] }); // Network

	setInterval(() => {
		client.packetCount = 0;
	}, 1000);

	Frog.eventEmitter.emit('playerConnect', {
		player: client,
		server: this,
		cancel(reason = "") {
			client.kick(reason)

			return true;
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

				return true;
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

				return true;
			},
		});

		client.kick(lang.kickmessages.versionMismatch.replace("%version%", config.version));
		return;
	}

	const responsePackInfo = new ResponsePackInfo();
	responsePackInfo.setMustAccept(true);
	responsePackInfo.setHasScripts(false);
	responsePackInfo.setBehaviorPacks([]);
	responsePackInfo.setTexturePacks([]);
	responsePackInfo.writePacket(client);
}

module.exports = {
	/**
	 * Starts the server
	 * 
	 * @async 
	 */
	async start() {
		await assert(parseInt(config.garbageCollectorDelay), NaN);
		await assert(parseInt(config.randomTickSpeed), NaN);

		if (!fs.existsSync("ops.yml")) {
			fs.writeFile("ops.yml", "", (err) => {
				if (err) throw err;
			});
		}

		if (!fs.existsSync("world")) fs.mkdirSync("world");

		console.clear()

		Logger.setupLogger()

		Logger.info(lang.server.loadingServer);

		if (process.versions.node.split('.')[0] < 14) {
			Logger.error("You are running node.JS version that is too old to run GreenFrogMCBE and bedrock-protocol")
			Logger.error("Please update it to 14.0.0+, from https://nodejs.org/")

			process.exit(-1)
		}

		Logger.info(lang.commands.verInfo.replace("%version%", Frog.getServerData().minorServerVersion));

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
			const serverLocalWorld = new World();
			serverLocalWorld.tick();
		}, parseInt(config.randomTickSpeed));
	},
};
