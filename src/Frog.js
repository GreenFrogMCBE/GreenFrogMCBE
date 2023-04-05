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

const { config, lang } = require("./api/ServerInfo");

const PluginLoader = require('./plugins/PluginLoader');
const PlayerInfo = require('./api/PlayerInfo');

const Logger = require('./server/Logger');

let _eventEmitter = new eventLib();

module.exports = {
    /**
     * Returns if the server is in debug mode
     * 
     * @returns {Boolean}
     */
    isDebug: process.argv.includes("--debug") || config.debug,

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
     * Shutdowns the server correctly
     * Also its calls onShutdown in every
     * single plugin that are used
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
            
            Logger.info(lang.server.stoppingServer);

            try {
                for (const player of PlayerInfo.players) {
                    if (!player.offline) player.kick(lang.kickmessages.serverShutdown);
                }
            } catch (ignored) {
                /* ignored */
            }

            setTimeout(() => {
                PluginLoader.unloadPlugins();
            }, 1000);
        }
    },
}