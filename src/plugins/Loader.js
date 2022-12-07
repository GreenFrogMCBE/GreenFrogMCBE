const fs = require('fs')
const Logger = require('../console/Logger')

class Loader {

    constructor() {
        this.plugins = []
        this.plugin = null
    }

    loadPlugins() {
        try {
            Logger.prototype.log('Loading plugins...')
            fs.readdirSync("./plugins")
        } catch (e) {
            Logger.prototype.log('Plugins folder not found. Creating it...')
            try {
                fs.mkdirSync("./plugins", { recursive: true })
                Logger.prototype.log('Plugins folder created')
            } catch (e) {
                Logger.prototype.log(`Failed to create plugins folder, this is a fatal error, shutting down: ${e}`, 'error')
            }
        }
        fs.readdir("./plugins", (err, plugins) => {
            plugins.forEach(plugin => {
                Logger.prototype.log(`Trying to load plugin "${plugin}"`)
                try {
                    this.plugin = require(`./plugins/${plugin}`)
                    eval(plugin + ".prototype.onLoad()");
                } catch (e) {
                    Logger.prototype.log(`Failed to load plugin "${plugin}". The error was: ${e}`, 'error')
                }
            });
        });
    }

}

module.exports = Loader;