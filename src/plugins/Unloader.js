const fs = require('fs')
const Logger = require('../console/Logger')
const ServerInfo = require('../api/ServerInfo')

class Unloader {

    constructor() {}

    shutdown() {

        const lang = ServerInfo.lang
        const config = ServerInfo.config

        fs.readdir("./plugins", (err, plugins) => {
            Logger.prototype.log(lang.shuttingdownplugins)
            Logger.prototype.log(lang.tensecwarn, 'warning')
            plugins.forEach(plugin => {
                    if (require(`../../plugins/${plugin}`).prototype.getName() === "") {
                        throw new Error(lang.failedtoshutdownplugin.replace('%plugin%', plugin))
                    }

                    // TODO: Somehow use await
                    require(`../../plugins/${plugin}`).prototype.onShutdown()
            });
            Logger.prototype.log(lang.doneshuttingdownplugins)
        });
        setTimeout(() => {
            Logger.prototype.log(lang.doneshuttingdown)
            process.exit(config.exitstatuscode) // TODO: Not sure if this is useful (i mean the config for exit status code)
        }, config.pluginsshutdowntime)
    }

}

module.exports = Unloader;
