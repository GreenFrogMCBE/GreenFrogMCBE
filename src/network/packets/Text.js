/* It's a class that sends a text packet to the client */
class Text extends require("./Packet") {
    /**
     * name() {
     *         return "text"
     * }
     * @returns Packet name i think (i am not sure)
    */
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