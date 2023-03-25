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
        this.message = null
        this.client = null
        this.server = null
    }

    cancel() {
        this.cancelled = true
    }

    async execute() {
        if (this.cancelled) return;

        Logger.warning(lang.errors.illegalMessage.replace("%message%", this.message).replace("%player%", this.client.username));
        this.client.kick(lang.kickmessages.invalidChatMessage);
    }
}

module.exports = PlayerSentInvalidMessageEvent;