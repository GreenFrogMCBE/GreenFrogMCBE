/** Main API functions for GreenFrog */

const eventLib = require('events');

const PluginLoader = require('./plugins/PluginLoader');
const PlayerInfo = require('./api/PlayerInfo');

const Logger = require('./server/Logger');

const yaml = require('js-yaml')
const fs = require('fs')

/**
 * Event manager
 * 
 * @private
 * @returns {EventEmitter}
 */
const _eventEmitter = new eventLib();

let __server;

/**
 * Returns the server object
 * 
 * @private
 * @returns {Server}
 */
function getServer() {
    return __server;
}

/**
 * Returns configuration files (e.g config.yml, and language files)
 * 
 * @returns {ConfigurationFile}
 * @type {import('./base/ConfigurationFile')}
 */
function getConfig() {
    return {
        config: yaml.load(fs.readFileSync("config.yml", "utf8")),
        lang: require(`./lang/${yaml.load(fs.readFileSync("config.yml", "utf8")).lang}.json`)
    };
}

module.exports = {
    /**
     * Returns if the server is in debug mode
     * 
     * @returns {Boolean}
     */
    isDebug: process.argv.includes("--debug") || getConfig().debug,

    /**
     * Returns the server object
     * 
     * @returns {Server}
     */
    server: getServer(),

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
    * @type {import('./base/ConfigurationFile')}
    */
    serverConfigurationFiles: getConfig(),

    /**
     * Returns if the event emitter for plugins
     * to listen for, and for server to execute
     * events
     * 
     * @returns {EventEmiter}
     * @type {import('./base/EventEmitter')}
     */
    eventEmitter: _eventEmitter,

    /**
     * Returns server data
     * 
     * @returns {ServerData}
     * @type {import('./base/ServerData')}
     */
    getServerData() {
        return {
            minorServerVersion: "3.1 (API rewrite)",
            majorServerVersion: "3.0",
            apiServerVersion: "3.0"
        };
    },

    /**
     * Sends message to all players
     * 
     * @param {String} message 
     */
    broadcastMessage(message) {
        for (const player of PlayerInfo.players) {
            player.sendMessage(message);
        }

        Logger.info(this.getConfigs().lang.broadcasts.broadcastmessage.replace("%msg%", message));
    },

    /**
     * Shutdowns the server correctly
     * Also its calls onShutdown() in every
     * single plugin that is loaded
     * 
     * @async
     */
    async shutdownServer(shutdownMessage) {
        let shouldShutdown = true;

        this.eventEmitter.emit('serverShutdownEvent', {
            server: this,
            cancel() {
                shouldShutdown = false;
            },
        });

        if (shouldShutdown) {
            await require("./server/ConsoleCommandSender").close();

            Logger.info(this.serverConfigurationFiles.lang.server.stoppingServer);

            getServer().close(shutdownMessage);

            setTimeout(() => {
                PluginLoader.unloadPlugins();
            }, 1000);
        }
    },
};
