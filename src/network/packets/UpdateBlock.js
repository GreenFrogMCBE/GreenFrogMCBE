class UpdateBlock extends require("./Packet") {
    constructor() { }

    name() {
        return "update_block"
    }

    validate(client) {
        if (!client) throw new Error("Packet processing error. Client is null")
    }

    writePacket(client, x, y, z, block_runtime_id) {
        this.validate(client)
        client.write('update_block', {
            "position": {
                "x": x,
                "y": y,
                "z": z
            },
            "block_runtime_id": block_runtime_id,
            "flags": {
                "_value": 2,
                "neighbors": false,
                "network": true,
                "no_graphic": false,
                "unused": false,
                "priority": false
            },
            "layer": 0
        })
    }
}

module.exports = UpdateBlock