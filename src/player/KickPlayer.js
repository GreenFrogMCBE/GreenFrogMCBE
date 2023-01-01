class KickPlayer {

    constructor() { }

    kick(client, reason = 'You were disconnected') {
        if (!client) throw new Error("kick(): No client!")
        
        client.kick(reason)
    }
}

module.exports = KickPlayer;