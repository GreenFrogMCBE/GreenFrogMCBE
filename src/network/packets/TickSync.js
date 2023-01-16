class TickSync extends require("./Packet") {
    constructor() { }

    name() {
        return "tick_sync"
    }

    validate(client) {
        if (!client) throw new Error("Packet processing error. Client is null")
    }

    writePacket(client, packet, time) {
        this.validate(client)
        client.write(this.name(), {
            request_time: packet.request_time,
            response_time: time,
        })
    }
}

module.exports = TickSync