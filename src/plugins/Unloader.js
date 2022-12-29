const fs = require('fs')
const Logger = require('../console/Logger')

class Unloader {

    constructor() {}

    shutdown() {
        fs.readdir("./plugins", (err, plugins) => {
            Logger.prototype.log('Shutting down plugins...')
            Logger.prototype.log('The server has 10 seconds to shutdown the plugins. If the servers fails to do it in time - there may be some issues with plugin data', 'warning')
            plugins.forEach(plugin => {
                    if (require(`../../plugins/${plugin}`).prototype.getName() === "") {
                        throw new Error(`Failed to shutdown plugin ${plugin}. No plugin name!`)
                    }

                    // TODO: Somehow use await
                    require(`../../plugins/${plugin}`).prototype.onShutdown()
            });
            Logger.prototype.log('Done shutting down plugins!')
        });
        setTimeout(() => {
            Logger.prototype.log('Done')
            process.exit(0)
        }, 10000)
    }

}

module.exports = Unloader;
