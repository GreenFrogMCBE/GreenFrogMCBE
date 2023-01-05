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
                    try {
                        require(`../../plugins/${plugin}`).prototype.getName()
                    } catch (e) {
                        throw new Error(`No plugin name! ${plugin}`)
                    }

                    try {
                        if (require(`../../plugins/${plugin}`).prototype.getServerVersion() ==! ServerInfo.majorserverversion) {
                            Logger.prototype.log(`The plugin ${require(`../../plugins/${plugin}`).prototype.getName()} is made for ${require(`../../plugins/${plugin}`).prototype.getServerVersion()}. Your server is on ${ServerInfo.majorserverversion}. This may cause unexpected issues or crashes`, 'warning')
                        }
                    } catch (e) {
                        Logger.prototype.log(`Plugin ${plugin} has no getServerVersion()`, 'warning')
                    }


                    let version = 'unknown'
                    try {
                        version = require(`../../plugins/${plugin}`).prototype.getVersion()
                    } catch (e) {
                        Logger.prototype.log(`Plugin ${plugin} has no getVersion()`, 'warning')
                    }


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
