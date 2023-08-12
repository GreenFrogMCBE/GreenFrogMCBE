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
const EventEmitter = require("events");
const yaml = require("js-yaml");
const path = require("path");
const fs = require("fs");

/** @returns {import("frog-protocol").Server} */
let _server;

/** @returns {EventEmitter} */
const _eventEmitter = new EventEmitter();

/** @returns {any} */
function getConfig() {
	const configData = yaml.load(fs.readFileSync("config.yml", "utf8"));
	return configData;
}

/** @returns {any} */
function getLang() {
	const config = getConfig();

	const langFilePath = path.join(__dirname, `lang/${config.chat.lang}.lang`);
	const langFileContent = fs.readFileSync(langFilePath, "utf8");
	const lang = langParser.parseRaw(langFileContent);

	return lang;
}

module.exports = {
	/**
	 * Returns if the server is in debug mode
	 *
	 * @returns {boolean}
	 */
	isDebug: process.argv.includes("--debug") || getConfig().dev.debug,

	/**
	 * Returns the server object
	 *
	 * @returns {import("frog-protocol").Server}
	 */
	server: _server,

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
	 * Returns the event emitter for plugins
	 * to listen for, and for server to execute
	 * events
	 *
	 * @type {import("Frog").EventEmitter}
	 */
	eventEmitter: _eventEmitter,

	/**
	 * Returns the release data
	 *
	 * @returns {import("Frog").ReleaseData}
	 */
	releaseData: {
		minorServerVersion: "3.7.1",
		majorServerVersion: "3.0",
		versionDescription: "Code improvement",
		apiVersion: "3.0",
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

		Logger.info(getKey("chat.format.plugin").replace("%s", message));
	},

	/**
	 * Shutdowns the server correctly
	 * Also it calls `onShutdown()` in every
	 * single plugin that is loaded
	 *
	 * @param {string} shutdownMessage
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

		// @ts-ignore (only for people using @ts-check)
		this.server.close(shutdownMessage);

		ConsoleCommandSender.closeConsole();
		PluginLoader.unloadPlugins();

		process.exit(this.config.dev.exitCodes.exit);
	},
};
