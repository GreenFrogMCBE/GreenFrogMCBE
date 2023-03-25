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
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-unused-vars */
const PlayerSentInvalidMessageEvent = require("./PlayerSentInvalidMessageEvent");

const { lang, config } = require("../api/ServerInfo");
const PlayerInfo = require("../api/PlayerInfo");
const Logger = require("../server/Logger");
const Event = require("./Event");


class PlayerChatEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerChatEvent";
		this.message = null
		this.player = null;
		this.server = null;
	}

	cancel() {
		this.cancelled = true;
	}

	async execute() {
		await this._execute(this);

		if (this.cancelled || config.disable === true) return;

		const fullmessage = lang.chat.chatFormat
			.replace("%username%", this.player.username)
			.replace("%message%", this.message);

		if (!this.message.trim()) return;

		if (this.message.includes("§") || this.message.length > 256 && config.blockInvalidMessages) {
			const playerSentInvalidMessageEvent = new PlayerSentInvalidMessageEvent()
			playerSentInvalidMessageEvent.server = this.server
			playerSentInvalidMessageEvent.player = this.player
			playerSentInvalidMessageEvent.message = this.message
			playerSentInvalidMessageEvent.execute()
			return;
		}

		Logger.info(lang.chat.chatMessage.replace("%message%", fullmessage));

		for (const player of PlayerInfo.players) {
			player.sendMessage(fullmessage);
		}
	}
}

module.exports = PlayerChatEvent;
