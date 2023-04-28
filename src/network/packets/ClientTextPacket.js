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

const { getKey } = require("../../utils/Language");

const { serverConfigurationFiles } = Frog;
const { config } = serverConfigurationFiles;

const PacketConstructor = require("./PacketConstructor");

class ClientTextPacket extends PacketConstructor {
	/**
	 * Returns packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "text";
	}

	/**
	 * Returns if is if packet critical?
	 * @returns {boolean}
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
		let message = packet.data.params.message;

		if (config.chat.disable || !message.trim()) return;

		let shouldChat = true;

		Frog.eventEmitter.emit("playerChat", {
			server,
			player,
			message,
			cancel: () => {
				shouldChat = false;
			},
		});

		if (!shouldChat) return;

		if (config.chat.blockInvalidMessages) {
			message = message.replace("§", "");

			if (message.length > 256) {
				Frog.eventEmitter.emit("playerMalformatedChatMessage", {
					server,
					player,
					message,
				});
				return;
			}
		}

		const formattedMessage = getKey("chat.format").replace("%s%", player.username).replace("%d%", message.replace("§", ""));

		Logger.info(formattedMessage);

		for (const player of PlayerInfo.players) {
			player.sendMessage(formattedMessage);
		}
	}
}

module.exports = ClientTextPacket;
