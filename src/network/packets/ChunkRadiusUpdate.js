class ChunkRadiusUpdate extends require("./Packet") {
    constructor() {}

    name() {
        return "chunk_radius_update"
    }

    validate(client) {
        if (!client) throw new Error("Packet processing error. Client is null")
    }

    writePacket(client, chunk_radius = 0) {
        this.validate(client)
        client.write(this.name(), {
            chunk_radius: chunk_radius
        })
    }
}

module.exports = ChunkRadiusUpdate