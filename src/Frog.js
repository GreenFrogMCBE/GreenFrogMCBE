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
const events = require("events");

const PluginLoader = require("./plugins/PluginLoader");
const PlayerInfo = require("./api/player/PlayerInfo");

const { getKey } = require("./utils/Language");

const Logger = require("./server/Logger");

const yaml = require("js-yaml");
const fs = require("fs");

/**
 * @private
 * @returns {import('../interfaces/EventEmitter')}
 */
const _eventEmitter = new events();

/**
 * @private 
 * @type {any}
 */
let _server;

/**
 * @private
 */
function getConfig() {
	return yaml.load(fs.readFileSync("config.yml", "utf8"));
}

/**
 * @private
 */
function getLang() {
	return require("./lang/" + yaml.load(fs.readFileSync("config.yml", "utf8")).chat.lang)
}

module.exports = {
	/**
	 * Returns if the server is in debug mode
	 *
	 * @returns {boolean}
	 */
	isDebug: process.argv.includes("--debug") || getConfig().dev.debug,

	/**
	 * Returns if the server is running in the test workflow
	 *
	 * @returns {boolean}
	 */
	isTest: process.argv.includes("--test"),

	/**
	 * Returns the server object
	 *
	 * @returns {Server}
	 */
	getServer() {
		return _server;
	},

	/**
	 * Sets the server object
	 * Not recommended to use in plugins.
	 *
	 * @param {Server}
	 */
	setServer: (server) => {
		_server = server;
	},

	/**
	 * Returns the configuration file
	 *
	 * @returns {any}
	 */
	config: getConfig(),

	/**
	 * Returns the language file
	 *
	 * @returns {any}
	 */
	lang: getLang(),

	/**
	 * Returns the event emitter for plugins
	 * to listen for, and for server to execute
	 * events
	 *
	 * @returns {import('../interfaces/EventEmitter')}
	 * @type {import('../interfaces/EventEmitter')}
	 */
	eventEmitter: _eventEmitter,

	/**
	 * Returns server data
	 *
	 * @type {import("./declarations/Typedefs").ServerInfo}
	 * @returns {import("./declarations/Typedefs").ServerInfo}
	 */
	releaseData: {
		minorServerVersion: "3.7",
		versionDescription: "Added query and containers",
		majorServerVersion: "3.0",
		apiVersion: "3.0",
	},

	/**
	 * Sends message to all players
	 *
	 * @param {string} message
	 */
	broadcastMessage(message) {
		for (const player of PlayerInfo.players) {
			player.sendMessage(message);
		}

		Logger.info(getKey("chat.format.plugin").replace("%s%", message));
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

		this.eventEmitter.emit("serverShutdownEvent", {
			cancel: () => {
				shouldShutdown = false;
			},
		});

		if (shouldShutdown) {
			Logger.info(getKey("server.shuttingDown"));

			await require("./server/ConsoleCommandSender").close();
			await this.getServer().close(shutdownMessage);

			setTimeout(() => {
				PluginLoader.unloadPlugins();
			}, 1000);
		}
	},

	/** @type {number} */
	_playerCount: 0,
};
