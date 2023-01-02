const PlayerInfo = require('../player/PlayerInfo')
const Logger = require('../console/Logger')

class Chatmessage {

    constructor() { }

    sendMessage(client, msg) {
        if (!msg) throw new Error("sendmessage(client, msg): No chat message")
        if (!client) throw new Error("sendmessage(client, msg): No client!")
        
        client.write('text', {
            type: 'announcement',
            needs_translation: false,
            source_name: '',
            message: msg,
            xuid: '',
            platform_chat_id: ''
        })
    }

    broadcastMessage(msg) {
        if (!msg) throw new Error("broadcastMessage(msg): No chat message!");

        for (let i = 0; i < PlayerInfo.prototype.getPlayers().length; i++) {
            let client = PlayerInfo.prototype.getPlayers()[i]
            this.sendMessage(client, msg)
        }
        Logger.prototype.log(`(broadcast) ${msg}`)
    }

}

module.exports = Chatmessage;