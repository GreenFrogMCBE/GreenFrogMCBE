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
const PluginLoader = require("./plugins/PluginLoader")
const PlayerInfo = require("./player/PlayerInfo")

const ConsoleCommandSender = require("./server/ConsoleCommandSender")

const { get_key } = require("./utils/Language")

const Language = require("./utils/Language")
const Logger = require("./utils/Logger")

const { EventEmitter, Event } = require("@kotinash/better-events")
const yaml = require("js-yaml")
const fs = require("fs")

/**
 * Returns the configuration file
 *
 * @returns {import("Frog").Config}
 */
function get_config() {
	return yaml.load(fs.readFileSync("config.yml"), "utf8")
}

let server

module.exports = {
	/**
	 * Returns the configuration file
	 *
	 * @returns {import("Frog").Config}
	 */
	config: get_config(),

	/**
	 * Returns the language file
	 *
	 * @returns {import("Frog").Language}
	 */
	lang: Language.get_language(get_config().chat.lang),

	/**
	 * Returns if the server is in debug mode
	 *
	 * @returns {boolean}
	 */
	is_debug: process.env.DEBUG || process.argv.includes("--debug") || get_config().dev.debug,

	/**
	 * Returns the server object
	 *
	 * @returns {import("frog-protocol").Server}
	 */
	server,

	/**
	 * Returns the release data
	 *
	 * @type {import("Frog").ReleaseData}
	 */
	release_data: {
		minor_server_version: "3.9",
		major_server_version: "3.0",
		version_description: "Updated to 1.20.50",
		api_version: "3.0",
	},

	/**
	 * Returns the server as a player object
	 *
	 * @returns {import("Frog").Player}
	 */
	as_player: {
		username: "Server",
		network: {
			address: get_config().network.host,
			port: get_config().network.port,
		},
		permissions: {
			op: true,
			is_console: true,
		},
		send_message: (message) => {
			Logger.info(message)
		},
	},

	/**
	 * Paths to files and folders
	 *
	 * @type {import("Frog").Directories}
	 */
	directories: {
		op_file: "./ops.yml",
		world_folder: "./world",
		config_file: "./config.yml",
		plugins_folder: "./plugins",
		plugin_data_folders: "./plugin-data",
		crash_reports_folder: "./crash-reports",
	},

	/**
	 * Sends a message to all online players
	 *
	 * @param {string} message
	 */
	broadcast_message(message) {
		for (const player of PlayerInfo.players_online) {
			player.send_message(message)
		}

		Logger.info(message)
	},

	/**
	 * Shutdowns the server
	 *
	 * @param {string} shutdown_message
	 * @async
	 */
	async shutdown_server(shutdown_message = get_key("kickMessages.serverClosed")) {
		EventEmitter.emit(
			new Event(
				"serverShutdown",
				{
					shutdown_message
				}
			),
			false
		)

		// Shutdown the bedrock-protocol server and disconnect all clients
		this.server.close(shutdown_message)

		// Prevent the usage of the console when the server is shutting down
		ConsoleCommandSender.closed = true

		// Unload (disable) all plugins
		await PluginLoader.unload_plugins()

		// And finally, exit the process
		process.exit(this.config.dev.exit_codes.successful)
	}
}
