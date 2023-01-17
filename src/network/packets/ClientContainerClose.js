const ContainerClose = require('./ContainerClose')

class ClientContainerClose extends require("./ClientPacket") {
    constructor() { }

    name() {
        return "container_close"
    }

    validate() { /* There is nothing to validate */ }

    handlePacket(client) {
        ContainerClose.prototype.writePacket(client, 3)
    }
}

module.exports = ClientContainerClose