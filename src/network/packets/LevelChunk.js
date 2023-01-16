class LevelChunk extends require("./Packet") {
    constructor() { }

    name() {
        return "level_chunk"
    }

    validate(client) {
        if (!client) throw new Error("Packet processing error. Client is null")
    }

    writePacket(client, x = 0, z = 0, sub_chunk_count = 0, cache_enabled = false, payload = [1, 88, 1, 88, 1, 88, 1, 88, 1, 88, 1, 88, 1, 88, 1, 88, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0]) {
        this.validate(client)
        client.write(this.name(), {
            "x": x,
            "z": z,
            "sub_chunk_count": sub_chunk_count,
            "cache_enabled": cache_enabled,
            "payload": { "type": "Buffer", "data": payload }
        })
    }
}

module.exports = LevelChunk