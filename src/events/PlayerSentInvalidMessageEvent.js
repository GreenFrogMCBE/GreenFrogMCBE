/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
const { lang } = require("../api/ServerInfo");
const Logger = require("../server/Logger");

class PlayerSentInvalidMessageEvent extends Event {
	constructor() {
		super();
		this.name = "PlayerSentInvalidMessageEvent";
		this.cancelled = false;
		this.message = null;
		this.player = null;
		this.server = null;
	}

	cancel() {
		this.cancelled = true;
	}

	async execute() {
		this._execute()

		if (this.cancelled) return;

		Logger.warning(lang.errors.illegalMessage.replace("%message%", this.message).replace("%player%", this.player.username));
		this.player.kick(lang.kickmessages.invalidChatMessage);
	}
}

module.exports = PlayerSentInvalidMessageEvent;
