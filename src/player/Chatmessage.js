class Chatmessage {

    constructor() { }

    sendMessage(client, msg) {
        if (!msg) throw new Error("sendmessage(): No chat message")
        if (!client) throw new Error("sendmessage(): No client!")

        client.write('text', {
            type: 'announcement',
            needs_translation: false,
            source_name: '',
            message: msg,
            xuid: '',
            platform_chat_id: ''
        })
    }

}

module.exports = Chatmessage;