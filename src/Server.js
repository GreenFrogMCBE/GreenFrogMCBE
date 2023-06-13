/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
/* eslint-disable no-unsafe-finally */

const VersionToProtocol = require("./utils/VersionToProtocol");

const PlayerInfo = require("./api/player/PlayerInfo");
const Frog = require("./Frog");

const GarbageCollector = require("./utils/GarbageCollector");
const PlayerInit = require("./server/PlayerInit");

const World = require("./world/World");

const PlayStatus = require("./network/packets/types/PlayStatus");

const Logger = require("./server/Logger");

const PluginLoader = require("./plugins/PluginLoader");
const ResponsePackInfo = require("./network/packets/ServerResponsePackInfoPacket");

const Language = require("./utils/Language");

const FrogProtocol = require("frog-protocol");

const assert = require("assert");

const path = require("path");
const fs = require("fs");

let server = null;
let config = Frog.serverConfigurationFiles.config;
let isDebug = Frog.isDebug;

/**
 * This function executes when something is off with the server
 *
 * @private
 * @param {Error} error
 */
async function _handleCriticalError(error) {
	const { host, port } = config.network;

	if (error.toString().includes("Server failed to start")) {
		Logger.error(Language.getKey("network.server.listening.failed").replace("%s%", `${host}:${port}`).replace("%d%", error));
		Logger.error(Language.getKey("network.server.listening.failed.otherServerRunning"));
	}

	Logger.error(`Server error: ${error.stack}`);

	if (!config.unstable) {
		process.exit(config.dev.crashCode);
	}
}

/**
 * Handles packets
 *
 * @param {Client} client
 * @param {JSON} packetParams
 * @throws {Error} - In case if the client is ratelimited
 */
function _handlePacket(client, packetParams) {
	try {
		const packetsDir = path.join(__dirname, "network", "packets");

		let exists = false;

		fs.readdirSync(packetsDir).forEach((filename) => {
			if (filename.startsWith("Client") && filename.endsWith(".js")) {
				const packetPath = path.join(packetsDir, filename);

				if (++client.packetCount > 2500) {
					Frog.eventEmitter.emit("packetRatelimit", {
						player: client,
						server: this,
					});

					throw new Error(Language.getKey("exceptions.network.rateLimited").replace("%s%", client.username).replace("%d%", client.packetCount));
				}

				const packet = new (require(packetPath))();
				if (packet.getPacketName() === packetParams.data.name) {
					let shouldReadPacket = true;

					Frog.eventEmitter.emit("packetRead", {
						player: client,
						data: packet.data,
						server: this,
					});

					if (shouldReadPacket) {
						packet.readPacket(client, packetParams, this);
					}

					exists = true;
				}
			}
		});

		if (!exists && config.dev.logUnhandledPackets) {
			Logger.warning(Language.getKey("network.packet.unhandledPacket"));
			console.info("%o", packetParams);
		}
	} catch (error) {
		client.kick(Language.getKey("kickMessages.invalidPacket"));

		Frog.eventEmitter.emit("packetReadError", {
			player: client,
			error,
			server: this,
		});

		Logger.error(Language.getKey("exceptions.network.packetHandlingError").replace("%s%", client.username).replace("%d%", error.stack));
	}
}

/**
 * Logs a warning if the debug or unstable mode is enabled.
 *
 * @private
 */
async function _initDebug() {
	if (config.unstable) {
		Logger.warning(Language.getKey("debug.unstable"));
		Logger.warning(Language.getKey("debug.unstable.unsupported"));
	}

	if (isDebug) Logger.debug(Language.getKey("debug.debugEnabled"));
}

/**
 * Listens the server
 *
 * @private
 */
async function _listen() {
	const { host, port } = config.network;
	const { levelName, motd, maxPlayers, version } = config.serverInfo;
	let { offlineMode } = config.serverInfo;

	if (process.argv.includes("--test")) {
		offlineMode = true;
	}

	try {
		server = FrogProtocol.createServer({
			host,
			port,
			version,
			offline: offlineMode,
			maxPlayers,
			motd: {
				motd,
				levelName,
			},
		}).on("connect", (client) => {
			client.on("join", () => {
				Frog.eventEmitter.emit("playerPreConnectEvent", {
					player: client,
					server: this,
					cancel: (reason = Language.getKey("kickMessages.serverDisconnect")) => {
						client.kick(reason);
					},
				});

				client.__queue = client.queue;
				client.queue = (packetName, data) => {
					let shouldQueue = true;

					Frog.eventEmitter.emit("packetQueue", {
						player: client,
						server: this,
						packetName,
						packetData: data,
						cancel: () => {
							shouldQueue = false;
						},
					});

					if (shouldQueue) {
						client.__queue(packetName, data);
					}
				};

				_onJoin(client);
			});

			client.on("packet", (packet) => {
				_handlePacket(client, packet);
			});
		});

		Frog.setServer(server);

		Logger.info(Language.getKey("network.server.listening.success").replace(`%s%`, `/${host}:${port}`));
	} catch (e) {
		Logger.error(Language.getKey("network.server.listening.failed").replace(`%s%`, `/${host}:${port}`).replace("%d%", e.stack));

		process.exit(config.dev.crashCode);
	}
}

/**
 * Executes, when player joins the server
 *
 * @param {Client} client
 * @private
 */
async function _onJoin(client) {
	await PlayerInit.initPlayer(client, server);

	Object.assign(client, {
		items: [],
		location: {
			x: 0,
			y: 100,
			z: 0,
			onGround: false,
			pitch: 0,
			yaw: 0,
		},
		inventory: {
			lastKnownItemNetworkId: 0,
			lastKnownItemRuntimeId: 0,
			items: [],
		},
		offline: false,
		kicked: false,
		health: 20,
		hunger: 20,
		packetCount: 0,
		username: client.profile.name,
		gamemode: Frog.serverConfigurationFiles.config.world.gamemode,
		world: null,
		op: null,
		dead: false,
		chunksEnabled: true,
		networkChunksLoop: null,
		hungerLossLoop: null,
		initialised: false,
		isConsole: false,
		fallDamageQueue: 0,
		ip: client.connection.address.split("/")[0],
		port: client.connection.address.split("/")[1],
	});

	setInterval(() => {
		client.packetCount = 0;
	}, 1000);

	PlayerInfo.addPlayer(client);

	if (PlayerInfo.players.length > config.maxPlayers) {
		const kickMessage = config.dev.useLegacyServerFullKickMessage ? Language.getKey("kickMessages.serverFull") : PlayStatus.FAILED_SERVER_FULL;
		client.kick(kickMessage);
		return;
	}

	const serverProtocol = VersionToProtocol.getProtocol(config.serverInfo.version);

	if (!config.dev.multiProtocol) {
		if (config.dev.useLegacyVersionMismatchKickMessage) {
			if (client.version !== serverProtocol) {
				const kickMessage = Language.getKey("kickMessages.versionMismatch").replace("%s%", config.serverInfo.version);
				client.kick(kickMessage);
				return;
			}
		} else {
			if (client.version > serverProtocol) {
				client.sendPlayStatus(PlayStatus.FAILED_SERVER, true);
				return;
			} else if (client.version < serverProtocol) {
				client.sendPlayStatus(PlayStatus.FAILED_CLIENT, true);
				return;
			}
		}
	}

	const responsePackInfo = new ResponsePackInfo();
	responsePackInfo.setMustAccept(true);
	responsePackInfo.setHasScripts(false);
	responsePackInfo.setBehaviorPacks([]);
	responsePackInfo.setTexturePacks([]);
	responsePackInfo.writePacket(client);

	Frog.eventEmitter.emit("playerJoin", {
		player: client,
		server: this,
		cancel: (reason = Language.getKey("kickMessages.serverDisconnect")) => {
			client.kick(reason);
		},
	});
}

module.exports = {
	/**
	 * Starts the server
	 */
	async start() {
		await assert(parseInt(config.performance.garbageCollectorDelay), NaN);
		await assert(parseInt(config.world.randomTickSpeed), NaN);

		if (!fs.existsSync("ops.yml")) {
			fs.writeFile("ops.yml", "", (err) => {
				if (err) throw err;
			});
		}

		if (!fs.existsSync("world")) fs.mkdirSync("world");

		console.clear();

		Language.getLanguage(Frog.serverConfigurationFiles.config.chat.lang);

		Logger.info(Language.getKey("server.loading"));
		Logger.info(Language.getKey("server.license"));

		if (process.versions.node.split(".")[0] < 14) {
			Logger.error(Language.getKey("errors.nodeJS.tooOld"));
			Logger.error(Language.getKey("errors.nodeJS.tooOld.update"));

			process.exit(-1);
		}

		if (config.world.chunkGeneratorLimit > 16) {
			Logger.warning(Language.getKey("world.chunks.chunksToGenerate.tooHigh"));
		}

		Logger.info(Language.getKey("frog.version").replace("%s%", `${Frog.getServerData().minorServerVersion} (${Frog.getServerData().versionDescription})`));

		process.on("uncaughtException", (err) => _handleCriticalError(err));
		process.on("unhandledRejection", (err) => _handleCriticalError(err));

		await _initDebug();

		PluginLoader.loadPlugins();

		await _listen();

		setInterval(() => {
			GarbageCollector.gc();
		}, parseInt(config.performance.garbageCollectorDelay));

		setInterval(() => {
			const world = new World();

			world.tick();
		}, parseInt(config.world.randomTickSpeed));
	},
};
