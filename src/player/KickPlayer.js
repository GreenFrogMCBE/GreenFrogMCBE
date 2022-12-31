class KickPlayer {

    constructor() { }

    kick(client, reason) {
        if (!reason) throw new Error("kick(): No chat message")
        if (!client) throw new Error("kick(): No client!")
        
        client.kick(reason)
    }
}

module.exports = KickPlayer;