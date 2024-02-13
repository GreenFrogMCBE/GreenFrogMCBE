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
const fs = require("fs")
const frogProtocol = require("frog-protocol")

const Frog = require("./Frog")

const PluginLoader = require("./plugins/PluginLoader")
const PluginManager = require("./plugins/PluginManager")

const CommandManager = require("./server/CommandManager")

const CommandVersion = require("./commands/CommandVersion")

const PlayerInfo = require("./player/PlayerInfo")

const ConsoleCommandSender = require("../src/server/ConsoleCommandSender")

const ServerStartupException = require("./utils/exceptions/ServerStartupException")

const Language = require("./utils/Language")
const Logger = require("./utils/Logger")

const PlayerJoinHandler = require("./network/handlers/PlayerJoinHandler")

const World = require("./world/World")

const Query = require("./query/Query")

let server = null

/**
 * Initializes the server
 *
 * @private
 */
async function initializeServer() {
	console.clear()

	createDirectories()
	logStartupMessages()

	checkNodeJSVersion()
	checkRenderDistance()

	setupHandlers()

	await PluginLoader.loadPlugins()
	await CommandManager.load_commands()
	await ConsoleCommandSender.start()

	initDebug()
}

/**
 * Sets up the `uncaughtException` and the `SIGINT` handlers
 *
 * @private
 */
function setupHandlers() {
	process.on("uncaughtException", (error) => {
		handleCriticalError(error)
	})

	process.on("SIGINT", () => {
		Frog.shutdown_server()
	})
}

/**
 * Creates necessary directories if they don't exist
 *
 * @private
 */
function createDirectories() {
	fs.mkdirSync(Frog.directories.world_folder, { recursive: true })

	fs.mkdirSync(Frog.directories.plugins_folder, { recursive: true })
	fs.mkdirSync(Frog.directories.plugin_data_folders, { recursive: true })

	if (!fs.existsSync(Frog.directories.op_file)) {
		fs.writeFileSync(Frog.directories.op_file, "")
	}
}

/**
 * Logs a warning if the debug or unstable mode is enabled
 *
 * @private
 */
function initDebug() {
	if (Frog.config.dev.unstable) {
		Logger.warning(Language.get_key("debug.unstable"))
		Logger.warning(Language.get_key("debug.unstable.unsupported"))
	}

	if (Frog.is_debug) {
		Logger.warning(Language.get_key("debug.debugEnabled"))

		process.env.DEBUG = true
	}
}

/**
 * Checks the Node.js version and displays an error if it's too old
 *
 * @private
 */
function checkNodeJSVersion() {
	if (parseInt(process.versions.node.split(".")[0]) < 14) {
		Logger.error(Language.get_key("errors.nodeJS.tooOld"))
		Logger.error(Language.get_key("errors.nodeJS.tooOld.update"))

		process.exit(-1)
	}
}

/**
 * Checks the render distance setting and displays a warning if it's too high
 *
 * @private
 */
function checkRenderDistance() {
	if (Frog.config.world.render_distance.serverSide > 16) {
		Logger.warning(Language.get_key("world.chunks.render_distance.tooHigh"))
	}
}

/**
 * Logs startup messages
 *
 * @private
 */
function logStartupMessages() {
	Logger.info(Language.get_key("server.loading"))
	Logger.info(Language.get_key("server.license"))

	// Executes `/version` as the console
	new CommandVersion()
		.execute(Frog.as_player)
}

/**
 * This function executes when something is off with the server
 *
 * @private
 * @param {Error} error
 */
function handleCriticalError(error) {
	const { host, port } = Frog.config.network

	Frog.event_emitter.emit("serverCriticalError", { error })

	if (error.message.includes("Server failed to start")) {
		Logger.error(
			Language.get_key("network.server.listening.failed")
				.replace("%s", `${host}:${port}`)
				.replace("%d", error.message)
		)

		Logger.error(Language.get_key("network.server.listening.failed.otherServerRunning"))
	}

	Logger.error(`Server error: ${error.stack}`)

	if (!Frog.config.dev.unstable) {
		process.exit(Frog.config.dev.exitCodes.crash)
	}
}

/**
 * Makes the server listen on the host and port specified in the config
 *
 * @private
 * @async
 */
async function listen() {
	const {
		host,
		port,
		raknet: raknetBackend
	} = Frog.config.network

	const {
		levelName,
		motd,
		maxPlayers,
		version,
		offlineMode,
	} = Frog.config.serverInfo

	const offline =
		process.env.TEST ||
		offlineMode

	try {
		server = frogProtocol.createServer({
			host,
			port,
			version,
			offline,
			raknetBackend,
			maxPlayers,
			motd: {
				motd,
				levelName,
			},
		}).on("connect", (client) => {
			client.on("join", () => {
				new PlayerJoinHandler()
					.onPlayerJoin(client)
			})
		})

		Frog.server = server
		Frog.event_emitter.emit("serverListen")

		Logger.info(
			Language.get_key("network.server.listening.success")
				.replace(
					"%s",
					`/${host}:${port}`
				)
		)
	} catch (error) {
		Logger.error(
			Language.get_key("network.server.listening.failed")
				.replace("%s", `/${host}:${port}`)
				.replace("%d", error.stack)
		)

		throw new ServerStartupException("Server failed to start")
	}
}

/**
 * Starts the world ticker
 *
 * @private
 */
function startWorldTicking() {
	const world = new World()

	world.tick_hunfer_loss()
	world.start_network_chunk_publisher_packet_sending_loop()

	setInterval(() => {
		world.tick()
	}, Frog.config.world.ticking.speed)
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
		players: PlayerInfo.players_online,
		maxPlayers: Frog.config.serverInfo.maxPlayers,
		gamemode: Frog.config.world.gamemode.world,
		version: Frog.config.serverInfo.version.toString(),
		plugins: Frog.config.query.showPlugins ? [""] : PluginManager.plugins,
	}
}

/**
 * Starts the query server.
 */
function startQueryServer() {
	const query = new Query()

	try {
		query.start(getQuerySettings())
	} catch (error) {
		Frog.event_emitter.emit("queryError", { error })

		Logger.error(
			Language.get_key("query.listening.failed")
				.replace(
					"%s",
					error.stack
				)
		)
	}
}

module.exports = {
	/**
	 * Starts the server
	 *
	 * @async
	 */
	async start() {
		await initializeServer()
		await listen()

		if (Frog.config.query.enabled) {
			startQueryServer()
		}

		startWorldTicking()
	},
}
