class PlayStatus extends require("./Packet") {
    constructor() {}

    name() {
        return "play_status"
    }

    validate(client) {
        if (!client) throw new Error("Packet processing error. Client is null")
    }

    writePacket(client, status = "player_spawn") {
        this.validate(client)
        client.write(this.name(), {
            status: status
        })
    }
}

module.exports = PlayStatus