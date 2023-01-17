const ContainerOpen = require('./ContainerOpen')

class ClientInteract extends require("./ClientPacket") {
    constructor() { }

    name() {
        return "interact"
    }

    validate() { }

    handlePacket(packet, client) {
        this.validate()
        switch (packet.data.params.action_id) {
            case "open_inventory": {
                ContainerOpen.prototype.writePacket(client, 3)
            }
            case "mouse_over_entity": {
                // TODO. Pvp is not implemented yet
                break
            }
            default: {
                throw new Error("Not supported packet data: packet = open_inventory, action_id = " + packet.data.params.action_id)
            }
        }
    }
}

module.exports = ClientInteract