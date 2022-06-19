const Logger = require('../Utils/Logger')

class PingPongPacketHandler {
    constructor() { }

    handle(raknet, msg, info) {
        Logger.prototype.info(`Your server got pinged by ${info.address}:${info.port}`)
    }
}

module.exports = PingPongPacketHandler;