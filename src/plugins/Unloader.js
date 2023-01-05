const fs = require('fs')
const Logger = require('../console/Logger')
const ServerInfo = require('../api/ServerInfo')

class Unloader {

    constructor() { }

    shutdown() {

        const lang = ServerInfo.lang
        const config = ServerInfo.config

        fs.readdir("./plugins", (err, plugins) => {
            Logger.prototype.log(lang.shuttingdownplugins)
            try {
                plugins.forEach(plugin => {
                    if (require(`../../plugins/${plugin}`).prototype.getName() === "") {
                        throw new Error(lang.failedtoshutdownplugin.replace('%plugin%', plugin))
                    }



                    require(`../../plugins/${plugin}`).prototype.onShutdown()
                });
            } finally {
                Logger.prototype.log(lang.doneshuttingdownplugins)
                Logger.prototype.log(lang.doneshuttingdown)
                process.exit(config.exitstatuscode)
            }
        });
    }

}

module.exports = Unloader;
