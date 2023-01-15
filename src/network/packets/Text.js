class Text extends require("./Packet") {
    constructor() { }

    name() {
        return "text"
    }

    validate(client, type) {
        if (!client) throw new Error("Packet processing error. Client is null")
        if (!type) throw new Error("Packet processing error. type is null")
    }

    writePacket(client, message = '', type = 'announcement', needs_translation = false, source_name = '', xuid = '', platform_chat_id = '') {
        this.validate(client, type)
        client.write(this.name(), {
            type: type,
            needs_translation: needs_translation,
            source_name: source_name,
            message: message,
            xuid: xuid,
            platform_chat_id: platform_chat_id
        })
    }
}

module.exports = Text