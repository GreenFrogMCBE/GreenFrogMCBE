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

const FrogProtocol = require("frog-protocol");
const fs = require("fs");

const PluginLoader = require("./plugins/PluginLoader");
const PluginManager = require("./plugins/PluginManager");

const PlayerInfo = require("./player/PlayerInfo");

const GarbageCollector = require("./utils/GarbageCollector");
const Language = require("./utils/Language");

const Logger = require("./utils/Logger");

const PlayerJoinHandler = require("./network/handlers/PlayerJoinHandler");

const World = require("./world/World");
const Query = require("./query/Query");

let server = null;

/**
 * Sets up an uncaught exception handler to catch critical errors
 *
 * @private
 */
function setupUncaughtExceptionHandler() {
	process.on("uncaughtException", (err) => handleCriticalError(err));
}

/**
 * Initializes the server settings and plugins
 *
 * @private
 */
function initializeServer() {
	createDirectories();
	console.clear();
	logStartupMessages();
	checkNodeJSVersion();
	checkRenderDistance();
	setupUncaughtExceptionHandler();
	loadPlugins();
	initDebug();
}

/**
 * Creates necessary directories if they don't exist
 *
 * @private
 */
function createDirectories() {
	if (!fs.existsSync("ops.yml")) fs.writeFileSync("ops.yml", "");
	if (!fs.existsSync("world")) fs.mkdirSync("world");
}

/**
 * Logs a warning if the debug or unstable mode is enabled
 *
 * @private
 */
function initDebug() {
	if (Frog.config.dev.unstable) {
		Logger.warning(Language.getKey("debug.unstable"));
		Logger.warning(Language.getKey("debug.unstable.unsupported"));
	}

	if (Frog.isDebug) Logger.debug(Language.getKey("debug.debugEnabled"));
}

/**
 * Checks the Node.js version and displays an error if it's too old
 *
 * @private
 */
function checkNodeJSVersion() {
	if (parseInt(process.versions.node.split(".")[0]) < 14) {
		Logger.error(Language.getKey("errors.nodeJS.tooOld"));
		Logger.error(Language.getKey("errors.nodeJS.tooOld.update"));
		process.exit(-1);
	}
}

/**
 * Checks the render distance setting and warns if it's too high
 *
 * @private
 */
function checkRenderDistance() {
	if (Frog.config.world.renderDistance > 16) {
		Logger.warning(Language.getKey("world.chunks.renderDistance.tooHigh"));
	}
}

/**
 * Logs some startup messages
 *
 * @private
 */
function logStartupMessages() {
	Logger.info(Language.getKey("server.loading"));
	Logger.info(Language.getKey("server.license"));
}

/**
 * This function executes when something is off with the server
 *
 * @private
 * @param {Error} error - The critical error that occurred
 */
function handleCriticalError(error) {
	const { host, port } = Frog.config.network;

	Frog.eventEmitter.emit("serverCriticalError", { error });

	if (error.toString().includes("Server failed to start")) {
		Logger.error(Language.getKey("network.server.listening.failed").replace("%s", `${host}:${port}`).replace("%d", error.toString()));
		Logger.error(Language.getKey("network.server.listening.failed.otherServerRunning"));
	}

	Logger.error(`Server error: ${error.stack}`);

	if (Frog.config.dev.unstable) {
		process.exit(Frog.config.dev.crashCode);
	}
}

/**
 * Loads plugins for the server
 *
 * @private
 */
async function loadPlugins() {
	await PluginLoader.loadPlugins();
}

/**
 * Listens to the server
 *
 * @private
 */
async function listen() {
	const { host, port } = Frog.config.network;
	const { levelName, motd, maxPlayers, version } = Frog.config.serverInfo;
	let { offlineMode } = Frog.config.serverInfo;

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
				// @ts-ignore (only for people using @ts-check)
				new PlayerJoinHandler().onPlayerJoin(client);
			});
		});

		Frog.server = server;
		Frog.eventEmitter.emit("serverListen");

		Logger.info(Language.getKey("network.server.listening.success").replace(`%s`, `/${host}:${port}`));
	} catch (error) {
		Logger.error(Language.getKey("network.server.listening.failed").replace(`%s`, `/${host}:${port}`).replace("%d", error.stack));

		process.exit(Frog.config.dev.exitCodes.crash);
	}
}

/**
 * Starts the garbage collector
 *
 * @private
 */
function startGarbageCollector() {
	setInterval(() => {
		GarbageCollector.gc();
	}, Frog.config.performance.garbageCollectorDelay);
}

/**
 * Starts the world ticker
 *
 * @private
 */
function startWorldTicker() {
	const world = new World();

	world.startHungerLossLoop();
	world.startNetworkChunkPublisherPacketSendingLoop();

	setInterval(() => {
		world.tick();
	}, Frog.config.world.tickSpeed);
}

/**
 * Gets the query settings for the server
 *
 * @private
 * @returns {import("Frog").QuerySettings}
 */
function getQuerySettings() {
	return {
		host: Frog.config.network.host,
		port: Frog.config.query.port,
		motd: Frog.config.serverInfo.motd,
		levelName: Frog.config.serverInfo.levelName,
		players: PlayerInfo.playersOnline,
		maxPlayers: Frog.config.serverInfo.maxPlayers.toString(),
		gamemode: Frog.config.world.gamemode,
		wl: false, // wl stands for whitelist. TODO: Implement whitelist
		version: Frog.config.serverInfo.version.toString(),
		plugins: Frog.config.query.showPlugins ? [""] : PluginManager.plugins,
	};
}

module.exports = {
	/**
	 * Starts the server
	 */
	async start() {
		initializeServer();
		await listen();

		if (Frog.config.query.enabled) {
			const query = new Query();

			try {
				query.start(getQuerySettings());
			} catch (error) {
				Frog.eventEmitter.emit("queryError", { error });

				Logger.error(Language.getKey("query.listening.failed").replace("%s", error.stack));
			}
		}

		startGarbageCollector();
		startWorldTicker();
	},
};
