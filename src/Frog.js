/** Main API functions for GreenFrog */

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
const eventLib = require('events')
const yaml = require('js-yaml')
const fs = require('fs')

const PluginLoader = require('./plugins/PluginLoader');
const PlayerInfo = require('./api/PlayerInfo');

const Logger = require('./server/Logger');

/**
 * Event manager
 * 
 * @private
 * @returns {EventEmitter}
 */
let _eventEmitter = new eventLib();

/**
 * Returns the server object
 * 
 * @private
 * @returns {Server}
 */
let __server;

module.exports = {
    /**
     * Returns if the server is in debug mode
     * 
     * @returns {Boolean}
     */
    isDebug: process.argv.includes("--debug") || this.getConfigs().config.debug,

    /**
     * Returns the server object
     * 
     * @returns {Server}
     */
    server: __server,

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
        }
    },

    /**
     * Returns configration files (e.g config.yml, and language files)
     * 
     * @returns {ConfigurationFile}
     * @type {import('./base/ConfigurationFile')}
     */
    getConfigs() {
        return {
            config: yaml.load(fs.readFileSync("config.yml", "utf8")),
            lang: require(`./lang/${yaml.load(fs.readFileSync("config.yml", "utf8")).lang}.json`)
        }
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

        Logger.info(this.getConfigs().lang.broadcasts.broadcastmessage.replace("%msg%", message));
    },

    /**
     * Shutdowns the server correctly
     * Also its calls onShutdown() in every
     * single plugin that is loaded
     */
    async shutdownServer() {
        let shouldShutdown = true

        this.eventEmitter.emit('serverShutdownEvent', {
            server: this,
            cancel() {
                shouldShutdown = false
            },
        });

        if (shouldShutdown) {
            await require("./server/ConsoleCommandSender").close();

            Logger.info(this.getConfigs().lang.server.stoppingServer);

            this.server.close(this.getConfigs().lang.kickmessages.serverShutdown)

            setTimeout(() => {
                PluginLoader.unloadPlugins();
            }, 1000);
        }
    },

    /**
     * Do not use this in your plugin!
     * Also no docs for you!
     * 
     * @deprecated
     * @param {Server} 
     */
    __setServer(server) {
        __server = server;
    }
}