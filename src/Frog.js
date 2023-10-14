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
const PluginLoader = require("./plugins/PluginLoader");
const PlayerInfo = require("./player/PlayerInfo");

const ConsoleCommandSender = require("./server/ConsoleCommandSender");

const { getKey } = require("./utils/Language");

const Logger = require("./utils/Logger");

const langParser = require("@kotinash/lang-parser");
const yaml = require("js-yaml");
const events = require("events");
const path = require("path");
const fs = require("fs");

/**
 * Returns the configuration file
 *
 * @returns {import("Frog").Config}
 */
function getConfig() {
	const configData = yaml.load(fs.readFileSync("config.yml", "utf8"));

	return configData;
}

/**
 * Returns the language file
 *
 * @returns {import("Frog").Language}
 */
function getLang() {
	const langFilePath = path.join(__dirname, `lang/${getConfig().chat.lang}.lang`);
	const langFileContent = fs.readFileSync(langFilePath, "utf8");
	const lang = langParser.parseRaw(langFileContent);
	
	return lang;
}

let server;

module.exports = {
	/**
	 * Returns the configuration file
	 *
	 * @returns {import("Frog").Config}
	 */
	config: getConfig(),

	/**
	 * Returns the language file
	 *
	 * @returns {import("Frog").Language}
	 */
	lang: getLang(),

	/**
	 * Returns if the server is in debug mode
	 *
	 * @returns {boolean}
	 */
	isDebug: process.env.DEBUG || process.argv.includes("--debug") || getConfig().dev.debug,

	/**
	 * Returns the server object
	 *
	 * @returns {import("frog-protocol").Server}
	 */
	server,

	/**
	 * Returns the event emitter for plugins
	 * to listen for, and for server to execute
	 * events
	 *
	 * @type {import("Frog").EventEmitter}
	 */
	eventEmitter: new events(),

	/**
	 * Returns the release data
	 *
	 * @type {import("Frog").ReleaseData}
	 */
	releaseData: {
		minorServerVersion: "3.8",
		majorServerVersion: "3.0",
		versionDescription: "Updated to 1.20.30 and added entities",
		apiVersion: "3.0",
	},

	/**
	 * Returns the server as a player object
	 *
	 * @returns {import("Frog").Player}
	 */
	asPlayer: {
		username: "Server",
		network: {
			address: getConfig().network.host,
			port: getConfig().network.port,
		},
		permissions: {
			op: true,
			isConsole: true,
		},
		sendMessage: (message) => {
			Logger.info(message);
		},
	},

	/**
	 * Paths to files and folders
	 */
	directories: {
		opFile: "./ops.yml",
		worldFolder: "./world",
		pluginsFolder: "./plugins",
		pluginDataFolders: "./pluginData"
	},

	/**
	 * Sends a message to all online players
	 *
	 * @param {string} message
	 */
	broadcastMessage(message) {
		for (const player of PlayerInfo.playersOnline) {
			player.sendMessage(message);
		}

		Logger.info(message);
	},

	/**
	 * Shutdowns the server
	 *
	 * @param {string} shutdownMessage
	 * @async
	 */
	async shutdownServer(shutdownMessage = getKey("kickMessages.serverClosed")) {
		let shouldShutdown = true;

		this.eventEmitter.emit("serverShutdown", {
			cancel: () => {
				shouldShutdown = false;
			},
		});

		if (!shouldShutdown) return;

		Logger.info(getKey("server.shuttingDown"));

		// Shutdown the bedrock-protocol server and disconnect all clients
		this.server.close(shutdownMessage);

		// Prevent the usage of the console when the server is shutting down
		ConsoleCommandSender.closed = true;

		// Unload (disable) all plugins
		await PluginLoader.unloadPlugins();

		// And finally, exit the process
		process.exit(this.config.dev.exitCodes.successful);
	},

	/**
	 * Crashes the server
	 */
	crash() {
		process.exit(this.config.dev.exitCodes.crash);
	},
};
