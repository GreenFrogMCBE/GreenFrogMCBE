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
const Chat = require("../api/Chat");

const { lang } = require("../api/ServerInfo");

const Event = require("./Event");

class PluginChatAsPlayerEvent extends Event {
	constructor() {
		super();
		this.name = "PluginChatAsPlayerEvent";
		this.server = null;
		this.player = null;
		this.message = null;
	}

	cancel() {
		this.cancelled = true;
	}

	async execute() {
		await this._execute(this);

		if (!this.cancelled) {
			Chat.broadcastMessage(lang.chat.chatFormat.replace("%username%", this.player.username).replace("%message%", this.message));
		}
	}
}

module.exports = PluginChatAsPlayerEvent;
