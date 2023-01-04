const fs = require('fs')
const Logger = require('../console/Logger')
const ServerInfo = require('../api/ServerInfo')

class CheckPluginFolder {
    constructor () { }

    check() {
        const lang = ServerInfo.lang
        const config = ServerInfo.config

        Logger.prototype.log(lang.loadingplugins)
        try {
            fs.readdirSync(config.pluginsfolder)
        } catch (e) {
            Logger.prototype.log(lang.plnf)
            try {
                fs.mkdirSync(config.pluginsfolder, { recursive: true })
                Logger.prototype.log(lang.pfc)
            } catch (e) {
                Logger.prototype.log(lang.ftcpf.replace('%error%', e), 'error')
                process.exit(config.crashstatuscode)
            }
        }

        try {
            fs.readdirSync("./pluginconfigs")
        } catch (e) {
            Logger.prototype.log(lang.pcnf)
            try {
                fs.mkdirSync("./pluginconfigs", { recursive: true })
                Logger.prototype.log(lang.pcfc)
            } catch (e) {
                Logger.prototype.log(lang.pcfcf.replace('%error%', e), 'error')
                process.exit(config.crashstatuscode)
            }
        }
    }
}

module.exports = CheckPluginFolder;