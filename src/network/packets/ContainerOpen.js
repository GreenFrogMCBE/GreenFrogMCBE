class ContainerOpen extends require("./Packet") {
    constructor() { }

    name() {
        return "container_open"
    }

    validate(client) {
        if (!client) throw new Error("Packet processing error. Client is null")
    }

    writePacket(client, window_id = -1, cords = {
        "x": 0,
        "y": 0,
        "z": 0
    }, window_type = 'inventory', runtime_entity_id = 2) {
        this.validate(client, window_id)
        client.write(this.name(), {
            "window_id": window_id,
            "window_type": window_type,
            "coordinates": cords,
            "runtime_entity_id": runtime_entity_id
        })
    }
}

module.exports = ContainerOpen