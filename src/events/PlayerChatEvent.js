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
const FailedToHandleEvent = require("./exceptions/FailedToHandleEvent");
const { lang, config } = require("../api/ServerInfo");
const PlayerInfo = require("../api/PlayerInfo");
const Logger = require("../server/Logger");
const Event = require("./Event");
const fs = require("fs");

class PlayerChatEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerChatEvent";
	}

	cancel() {
		this.cancelled = true;
	}

	async execute(server, client, message) {
		await new Promise((resolve, reject) => {
			fs.readdir("./plugins", (err, plugins) => {
				if (err) {
					reject(err);
				} else {
					plugins.forEach((plugin) => {
						try {
							require(`${__dirname}/../../plugins/${plugin}`).PlayerChatEvent(server, client, message, this);
						} catch (e) {
							FailedToHandleEvent.handleEventError(e, plugin, this.name);
						}
					});
					resolve();
				}
			});
		});

		if (this.cancelled || config.disable === true) return;

		// Format the chat message with the username and message
		const fullmessage = lang.chat.chatFormat
			.replace("%username%", client.username)
			.replace("%message%", message);

		// Ignore the message if it contains only white spaces
		if (!message.trim()) return;

		// Ignore the message if it contains invalid characters, or if its length exceeds 256 characters
		if (message.includes("§") || message.length > 256 && config.blockInvalidMessages) {
			const _PlayerSentInvalidMessageEvent = new PlayerSentInvalidMessageEvent()
			_PlayerSentInvalidMessageEvent.execute(server, client, message)
			return;
		}

		// Log the chat message
		Logger.info(lang.chat.chatMessage.replace("%message%", fullmessage));

		// Send the chat message to all players
		for (const player of PlayerInfo.players) {
			player.sendMessage(fullmessage);
		}
	}
}

module.exports = PlayerChatEvent;
