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
const frog_protocol = require("frog-protocol")

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

const { EventEmitter, Event } = require("@kotinash/better-events")

const Query = require("./query/Query")
const Player = require("./player/Player")

let server = null

/**
 * Initializes the server
 *
 * @private
 */
async function initialize_server() {
	console.clear()

	create_directories()
	log_startup_messages()

	check_node_js_version()
	check_render_distance()

	setup_handlers()

	await PluginLoader.load_plugins()
	await CommandManager.load_commands()
	await ConsoleCommandSender.start()

	init_debug()
}

/**
 * Sets up the `uncaughtException` and the `SIGINT` handlers
 *
 * @private
 */
function setup_handlers() {
	process.on("uncaughtException", (error) => {
		handle_critical_error(error)
	})

	process.on("SIGINT", () => {
		Frog.shutdown_server()
			.catch((error) => {
				Logger.error(`Failed to shutdown the server: ${error.stack}`)
			})
	})
}

/**
 * Creates necessary directories if they don't exist
 *
 * @private
 */
function create_directories() {
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
function init_debug() {
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
function check_node_js_version() {
	if (Number(process.versions.node.split(".")[0]) < 14) {
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
function check_render_distance() {
	if (Frog.config.world.render_distance.server_side > 16) {
		Logger.warning(Language.get_key("world.chunks.render_distance.tooHigh"))
	}
}

/**
 * Logs startup messages
 *
 * @private
 */
function log_startup_messages() {
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
function handle_critical_error(error) {
	const { host, port } = Frog.config.network

	if (error.message.includes("Server failed to start")) {
		Logger.error(
			Language.get_key("network.server.listening.failed", [
				`${host}:${port}`,
				error.message
			])
		)

		Logger.error(Language.get_key("network.server.listening.failed.otherServerRunning"))
	}

	Logger.error(`Server error: ${error.stack}`)

	if (!Frog.config.dev.unstable) {
		process.exit(Frog.config.dev.exit_codes.crash)
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
		raknet: raknet_backend
	} = Frog.config.network

	const {
		level_name,
		motd,
		max_players,
		version,
		offline_mode,
	} = Frog.config.server_info

	const offline =
		process.env.TEST ||
		offline_mode

	try {
		server = frog_protocol.createServer({
			host,
			port,
			version,
			offline,
			raknetBackend: raknet_backend,
			maxPlayers: max_players,
			motd: {
				motd,
				level_name,
			},
		}).on("connect", (connection) => {
			connection.on("join", () => {
				const player = new Player(connection.profile.name, connection)

				new PlayerJoinHandler()
					.on_player_join(player)
			})
		})

		Frog.server = server

		EventEmitter.emit(
			new Event(
				"serverListen"
			)
		)

		Logger.info(
			Language.get_key("network.server.listening.success", [`/${host}:${port}`])
		)
	} catch (error) {
		throw new ServerStartupException(
			Language.get_key("network.server.listening.failed",
				[
					`/${host}:${port}`,
					error.stack
				]
			)
		)
	}
}

/**
 * Starts the world ticker
 *
 * @private
 */
function start_world_ticking() {
	const world = new World()

	world.tick_hunger_loss()
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
function get_query_settings() {
	return {
		host: Frog.config.network.host,
		port: Frog.config.query.port,
		motd: Frog.config.server_info.motd,
		level_name: Frog.config.server_info.level_name,
		players: PlayerInfo.players_online,
		max_players: Frog.config.server_info.max_players,
		gamemode: Frog.config.world.gamemode.world,
		version: Frog.config.server_info.version.toString(),
		plugins: Frog.config.query.show_plugins ? [""] : PluginManager.plugins,
	}
}

/**
 * Starts the query server.
 */
function start_query_server() {
	const query = new Query()

	try {
		query.start(get_query_settings())
	} catch (error) {
		EventEmitter.emit(
			new Event(
				"queryError"
			)
		)

		Logger.error(
			Language.get_key("query.server.listening.failed", [ error.stack ])
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
		await initialize_server()
		await listen()

		if (Frog.config.query.enabled) {
			start_query_server()
		}

		start_world_ticking()
	},
}
