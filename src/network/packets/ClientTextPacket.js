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
const Frog = require("../../Frog");

const PlayerInfo = require("../../api/player/PlayerInfo");

const Logger = require("../../server/Logger");

const { serverConfigurationFiles } = Frog
const { lang, config } = serverConfigurationFiles

const PacketConstructor = require("./PacketConstructor");

class ClientTextPacket extends PacketConstructor {
	/**
	 * Returns if packet name
	 * @returns if name of if packet
	 */
	getPacketName() {
		return "text";
	}

	/**
	 * Returns if is if packet critical?
	 * @returns Returns if if packet is critical
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Reads if packet from player
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} server
	 */
	async readPacket(player, packet, server) {
		const message = packet.data.params.message;

		let shouldChat = true

		Frog.eventEmitter.emit('playerChat', {
			server,
			player,
			message,
			cancel() {
				shouldChat = false
			}
		});

		if (!shouldChat || config.chat.disable) return

		const fullmessage = lang.chat.chatFormat.replace("%username%", player.username).replace("%message%", message);

		if (!message.trim()) return;

		if (message.includes("§") || (message.length > 256 && config.chat.blockInvalidMessages)) {
			Frog.eventEmitter.emit('playerMalformatedChatMessage', {
				server,
				player,
				message
			})
			return;
		}

		Logger.info(lang.chat.chatMessage.replace("%message%", fullmessage));

		for (const player of PlayerInfo.players) {
			player.sendMessage(fullmessage);
		}
	}
}

module.exports = ClientTextPacket;
