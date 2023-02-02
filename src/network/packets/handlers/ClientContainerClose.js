const ContainerClose = require('../ContainerClose')
const Handler = require('./Handler')

class ClientContainerClose extends Handler {
    handle(client) {
        ContainerClose.prototype.writePacket(client, 3)
    }
}

module.exports = ClientContainerClose