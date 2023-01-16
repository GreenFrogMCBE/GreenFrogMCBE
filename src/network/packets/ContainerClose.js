class ContainerClose extends require("./Packet") {
    constructor() {}

    name() {
        return "container_close"
    }

    validate(client) {
        if (!client) throw new Error("Packet processing error. Client is null")
        if (window_id = null) throw new Error("Packet processing error. window_id is null")
    }

    writePacket(client, window_id = null, server = false) {
        this.validate(client, window_id)
        client.write(this.name(), {
            window_id: window_id,
            server: server
        })
    }
}

module.exports = ContainerClose