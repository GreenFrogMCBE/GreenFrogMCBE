const Logger = require('../../console/Logger')
const lang = require('../../api/ServerInfo').lang


class ClientUnhandled extends require("./ClientPacket") {
    constructor() {}

    name() {
        return "unhandled_packet"
    }

    validate() {}

    handlePacket(packet) {
        Logger.prototype.log(`${lang.ignoredpacket.replace('%packet%', packet.data.name)}`, 'debug')
    }
}

module.exports = ClientUnhandled