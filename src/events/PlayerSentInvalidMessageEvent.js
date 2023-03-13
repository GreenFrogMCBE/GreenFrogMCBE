const fs = require('fs');
const { lang } = require('../api/ServerInfo');
const Logger = require('../server/Logger');
const FailedToHandleEvent = require("./exceptions/FailedToHandleEvent");

class PlayerSentInvalidMessageEvent extends Event {
    constructor() {
        super();
        this.name = "PlayerSentInvalidMessageEvent";
        this.cancelled = false
    }

    cancel() {
        this.cancelled = true
    }

    execute(server, client, message) {
        fs.readdir("./plugins", (err, plugins) => {
            plugins.forEach((plugin) => {
                try {
                    require(`${__dirname}/../../plugins/${plugin}`).PlayerSentInvalidMessageEvent(server, client, message, this);
                } catch (e) {
                    FailedToHandleEvent.handleEventError(e, plugin, this.name);
                }
            });
        });

        setTimeout(() => {
            if (this.cancelled) return

            Logger.warning(lang.errors.illegalMessage.replace("%message%", message).replace("%player%", client.username));
            client.kick(lang.kickmessages.invalidChatMessage);
        }, 50)
    }
}

module.exports = PlayerSentInvalidMessageEvent;