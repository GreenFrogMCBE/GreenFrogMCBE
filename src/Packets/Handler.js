const Logger = require('../Utils/Logger')
const PingPongPacketHandler = require('../Packets/PingPongPacketHandler')

class Handler {
    constructor() { }

    handle (raknet, msg, info) {
        if (info.size == 33) {
            PingPongPacketHandler.prototype.handle(raknet, msg, info)
            return;
        }
        Logger.prototype.info(`Got a packet from ${info.address}:${info.port}, with size ${info.size}, and version ${info.family}`)
    }
}

module.exports = Handler;