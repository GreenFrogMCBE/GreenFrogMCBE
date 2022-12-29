const fs = require('fs')
const Logger = require('../console/Logger')
const CheckPluginFolder = require('./CheckPluginFolder')
const ServerInfo = require('../api/ServerInfo')
const PluginManager = require('../api/PluginManager')

class Loader {

    constructor() {}

    loadPlugins() {

        CheckPluginFolder.prototype.check()

        fs.readdir("./plugins", (err, plugins) => {
            plugins.forEach(plugin => {
                Logger.prototype.log(`Loading ${plugin}...`)
                try {

                    if (require(`../../plugins/${plugin}`).prototype.getName() === "") {
                        throw new Error(`Empty plugin name! Source: ${plugin}`)
                    }

                    try {
                        if (require(`../../plugins/${plugin}`).prototype.getServerVersion() === ServerInfo.serverversion) {
                            Logger.prototype.log(`Plugin ${plugin} supports your server version`)
                        } else {
                            Logger.prototype.log(`The plugin ${require(`../../plugins/${plugin}`).prototype.getName()} is made for ${require(`../../plugins/${plugin}`).prototype.getServerVersion()}. Your server is on ${ServerInfo.serverversion}. This may cause unexpected issues or crashes`)
                        }
                    } catch (e) {
                        throw new Error(`Plugin ${plugin} has no getServerVersion()`, 'warning')
                    }


                    let version = 'unknown'
                    try {
                        version = require(`../../plugins/${plugin}`).prototype.getVersion()
                    } catch (e) {
                        throw new Error(`Plugin ${plugin} has no getVersion()`, 'warning')
                    }

                    Logger.prototype.log(`Loaded plugin ${require(`../../plugins/${plugin}`).prototype.getName()} ${version}`)

                    PluginManager.prototype.addPlugin(require(`../../plugins/${plugin}`).prototype.getName())

                    require(`../../plugins/${plugin}`).prototype.onLoad()
                } catch (e) {
                    let version = 'unknown'
                    try {
                        version = require(`../../plugins/${plugin}`).prototype.getVersion()
                    } catch (e) { Logger.prototype.log(`Failed to load plugin "${require(`../../plugins/${plugin}`).prototype.getName()} version: ${version}". The error was: ${e.stack}`, 'error') }
                }
            });
            Logger.prototype.log('All plugins are loaded!')
        });
    }

}

module.exports = Loader;
