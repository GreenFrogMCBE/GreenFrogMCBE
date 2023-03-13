/* eslint-disable no-unused-vars */
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

    async execute(server, client, message) {
        new Promise((resolve, reject) => {
            fs.readdir("./plugins", async (err, plugins) => {
                for (const plugin of plugins) {
                    try {
                        await require(`${__dirname}/../../plugins/${plugin}`).PlayerSentInvalidMessageEvent(server, client, message, this);
                    } catch (e) {
                        FailedToHandleEvent.handleEventError(e, plugin, this.name);
                    }
                }
                resolve();
            });
        }).then(() => {
            if (this.cancelled) return;

            Logger.warning(lang.errors.illegalMessage.replace("%message%", message).replace("%player%", client.username));
            client.kick(lang.kickmessages.invalidChatMessage);
        });
    }
}

module.exports = PlayerSentInvalidMessageEvent;