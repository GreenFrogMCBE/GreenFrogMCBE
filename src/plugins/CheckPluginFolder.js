const fs = require('fs')
const Logger = require('../console/Logger')

class CheckPluginFolder {
    constructor () { }

    check() {
        Logger.prototype.log("Loading plugins")
        try {
            fs.readdirSync("./plugins")
        } catch (e) {
            Logger.prototype.log("Plugins folder not found")
            try {
                fs.mkdirSync("./plugins", { recursive: true })
                Logger.prototype.log("Plugin folder created!")
            } catch (e) {
                Logger.prototype.log(`Failed to create a plugin folder: ${e}`, 'error')
                process.exit(-1)
            }
        }
    }
}

module.exports = CheckPluginFolder;