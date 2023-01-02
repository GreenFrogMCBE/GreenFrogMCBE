const fs = require('fs')
const Logger = require('../console/Logger')
const ServerInfo = require('../api/ServerInfo')

class Unloader {

    constructor() {}

    shutdown() {

        const lang = ServerInfo.lang
        const config = ServerInfo.config

        fs.readdir(config.pluginsfolder, (err, plugins) => {
            Logger.prototype.log(lang.shuttingdownplugins)
            Logger.prototype.log(lang.tensecwarn, 'warning')
            plugins.forEach(plugin => {
                    if (require(`${config.ddpluginsfolder}${plugin}`).prototype.getName() === "") {
                        throw new Error(lang.failedtoshutdownplugin.replace('%plugin%', plugin))
                    }

                    // TODO: Somehow use await
                    require(`${config.ddpluginsfolder}${plugin}`).prototype.onShutdown()
            });
            Logger.prototype.log(lang.doneshuttingdownplugins)
        });
        setTimeout(() => {
            Logger.prototype.log(lang.doneshuttingdown)
            process.exit(config.exitstatuscode)
        }, config.pluginsshutdowntime)
    }

}

module.exports = Unloader;
