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
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Frog = require("./Frog");

const PluginLoader = require("./plugins/PluginLoader");

const PlayerInfo = require("./api/player/PlayerInfo");
const GarbageCollector = require("./utils/GarbageCollector");
const Language = require("./utils/Language");
const Logger = require("./server/Logger");

const PlayerJoinHandler = require("./network/handlers/PlayerJoinHandler");
const PacketHandler = require("./network/handlers/PacketHandler");

const Query = require("./query/Query");
const World = require("./world/World");

const FrogProtocol = require("frog-protocol");
const fs = require("fs");

let server = null;

const config = Frog.config;
const isDebug = Frog.isDebug;

/**
 * This function executes when something is off with the server
 *
 * @private
 * @param {Error} error
 */
async function _handleCriticalError(error) {
	const { host, port } = config.network;

	Frog.eventEmitter.emit("serverCriticalError", { error });

	if (error.toString().includes("Server failed to start")) {
		Logger.error(Language.getKey("network.server.listening.failed").replace("%s%", `${host}:${port}`).replace("%d%", error));
		Logger.error(Language.getKey("network.server.listening.failed.otherServerRunning"));
	}

	Logger.error(`Server error: ${error.stack}`);

	if (config.unstable) {
		process.exit(config.dev.crashCode);
	}
}

/**
 * Logs a warning if the debug or unstable mode is enabled.
 *
 * @private
 */
async function _initDebug() {
	if (config.dev.unstable) {
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

	if (Frog.isTest) offlineMode = true;

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
			client
				.on("join", () => {
					const joinHandler = new PlayerJoinHandler();
					joinHandler.onPlayerJoin(client);
				})
				.on("packet", (packet) => {
					const packetHandler = new PacketHandler();
					packetHandler.handlePacket(client, packet);
				});
		});

		Frog.setServer(server);
		Frog.eventEmitter.emit("serverListen", { server });

		Logger.info(Language.getKey("network.server.listening.success").replace(`%s%`, `/${host}:${port}`));
	} catch (e) {
		Logger.error(Language.getKey("network.server.listening.failed").replace(`%s%`, `/${host}:${port}`).replace("%d%", e.stack));

		process.exit(config.dev.crashCode);
	}
}

module.exports = {
	/**
	 * Starts the server
	 */
	async start() {
		Frog.eventEmitter.emit("serverStart");

		if (!fs.existsSync("ops.yml")) {
			fs.writeFile("ops.yml", "", (err) => {
				if (err) throw err;
			});
		}

		if (!fs.existsSync("world")) fs.mkdirSync("world");

		console.clear();

		Language.getLanguage(Frog.config.chat.lang);

		Logger.info(Language.getKey("server.loading"));
		Logger.info(Language.getKey("server.license"));

		if (process.versions.node.split(".")[0] < 14) {
			Logger.error(Language.getKey("errors.nodeJS.tooOld"));
			Logger.error(Language.getKey("errors.nodeJS.tooOld.update"));

			process.exit(-1);
		}

		if (config.world.renderDistance > 16) {
			Logger.warning(Language.getKey("world.chunks.renderDistance.tooHigh"));
		}

		Logger.info(Language.getKey("frog.version").replace("%s%", `${Frog.releaseData.minorServerVersion} (${Frog.releaseData.versionDescription})`));

		process.on("uncaughtException", (err) => _handleCriticalError(err));
		process.on("unhandledRejection", (err) => _handleCriticalError(err));

		await _initDebug();

		PluginLoader.loadPlugins();

		await _listen();

		if (config.query.enabled) {
			const query = new Query();

			try {
				let querySettings = {
					host: config.network.host,
					port: config.query.port,
					motd: config.serverInfo.motd,
					levelName: config.serverInfo.levelName,
					players: PlayerInfo.players,
					maxPlayers: String(config.serverInfo.maxPlayers),
					gamemode: config.world.gameMode,
					wl: false, // wl stands for whitelist. TODO: Implement whitelist
					version: String(config.serverInfo.version),
					plugins: PlayerInfo.players,
				};

				if (config.query.showPlugins) querySettings.plugins = [""];

				query.start(querySettings);
			} catch (error) {
				Frog.eventEmitter.emit("queryError", { error });
				Logger.error(Language.getKey("query.server.listening.failed").replace("%s%", error.stack));
			}
		}

		setInterval(() => {
			GarbageCollector.gc();
		}, parseInt(config.performance.garbageCollectorDelay));

		setInterval(() => {
			new World().tick();
		}, parseInt(config.world.tickSpeed));
	},
};
