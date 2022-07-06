const Logger = require('../Utils/Logger')

class LoginHandler {
    constructor() { }

    handle(raknet, msg, info) {
           Logger.prototype.info(`${info.address}:${info.port} is connecting`)
           Logger.prototype.info(`[${info.address}:${info.port}] Decoding packet...`)
           Logger.prototype.info(msg.readString())
           Logger.prototype.error(`not implemented`)
    }
}
	
module.exports = LoginHandler;