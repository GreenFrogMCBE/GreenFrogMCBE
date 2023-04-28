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
const eventLib = require("events");

const PluginLoader = require("./plugins/PluginLoader");
const PlayerInfo = require("./api/player/PlayerInfo");

const { getKey } = require("./utils/Language");

const Logger = require("./server/Logger");

const yaml = require("js-yaml");
const fs = require("fs");

/**
 * Event emitter
 *
 * @private
 * @returns {EventEmitter}
 */
const _eventEmitter = new eventLib();

let __server;

/**
 * Returns configuration files
 *
 * @returns {ConfigurationFile}
 * @type {import('./type/ConfigurationFile')}
 */
function getConfig() {
	return {
		config: yaml.load(fs.readFileSync("config.yml", "utf8")),
	};
}

module.exports = {
	/**
	 * Returns if the server is in debug mode
	 *
	 * @returns {boolean}
	 */
	isDebug: process.argv.includes("--debug") || getConfig().config.dev.debug,

	/**
	 * Returns the server object
	 *
	 * @returns {Server}
	 */
	getServer() {
		return __server;
	},

	/**
	 * Sets the server object
	 * Not recommended to use in plugins.
	 *
	 * @param {Server}
	 */
	setServer: (server) => {
		__server = server;
	},

	/**
	 * Returns configuration files (e.g config.yml, and language files)
	 *
	 * @returns {ConfigurationFile}
	 * @type {import('./type/ConfigurationFile')}
	 */
	serverConfigurationFiles: getConfig(),

	/**
	 * Returns if the event emitter for plugins
	 * to listen for, and for server to execute
	 * events
	 *
	 * @returns {EventEmitter}
	 * @type {import('./type/EventEmitter')}
	 */
	eventEmitter: _eventEmitter,

	/**
	 * Returns server data
	 *
	 * @returns {ServerData}
	 * @type {import('./type/ServerData')}
	 */
	getServerData() {
		return {
			minorServerVersion: "3.4 (Updated to 1.19.80, and better block API)",
			majorServerVersion: "3.0",
			apiVersion: "3.0",
		};
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
	 * Also its calls onShutdown() in every
	 * single plugin that is loaded
	 *
	 * @param {string} shutdownMessage
	 */
	async shutdownServer(shutdownMessage = getKey("kickMessages.serverClosed")) {
		let shouldShutdown = true;

		this.eventEmitter.emit("serverShutdownEvent", {
			server: this,
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

	/** Player count. Do not use this in your plugin, please */
	__playercount: 0,

	/** Adds player to player count. Do not use this in your plugin, please */
	__addPlayer() {
		this.__playercount++;
	},

	/** Removes player from player count. Do not use this in your plugin, please */
	__deletePlayer() {
		this.__playercount--;
	},
};
