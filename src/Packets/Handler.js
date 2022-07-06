const Logger = require('../Utils/Logger')
const PingPongPacketHandler = require('../Packets/PingPongPacketHandler')
const LoginHandler = require('../Packets/LoginHandler')

class Handler {
    constructor() { }

    handle (raknet, msg, info, socket) {
        if (info.size == 33) {
            PingPongPacketHandler.prototype.handle(raknet, msg, info)
            return;
        }
        if (info.size == 1464) {
            LoginHandler.prototype.handle(raknet, msg, info)
            return;
        }
        LoginHandler.prototype.handle(raknet, msg, info)
        Logger.prototype.info(`Got an unhandled packet from ${info.address}:${info.port}, with size ${info.size}, and version ${info.family}`)
    }
}

module.exports = Handler;