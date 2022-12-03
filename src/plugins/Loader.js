const fs = require('fs')
const Logger = require('../console/Logger')

class Loader {

    constructor() { }

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
    }

}

module.exports = Loader;