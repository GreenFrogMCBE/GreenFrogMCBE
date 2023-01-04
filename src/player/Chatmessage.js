const PlayerInfo = require('../player/PlayerInfo')
const Logger = require('../console/Logger')
const lang = require('../api/ServerInfo').lang

class Chatmessage {

    constructor() { }

    sendMessage(client, msg) {
        if (!msg) throw new Error(lang.apinochatmessage)
        if (!client) throw new Error(lang.apinoclient)
        
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
        if (!msg) throw new Error(lang.apibcmnochatmsg);

        for (let i = 0; i < PlayerInfo.prototype.getPlayers().length; i++) {
            let client = PlayerInfo.prototype.getPlayers()[i]
            this.sendMessage(client, msg)
        }
        Logger.prototype.log(lang.bcmsg.replace('%msg%', msg))
    }

}

module.exports = Chatmessage;