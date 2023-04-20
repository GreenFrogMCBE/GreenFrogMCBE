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
		const message = packet.data.params.message;

		let shouldChat = true;

		Frog.eventEmitter.emit("playerChat", {
			server,
			player,
			message,
			cancel: () => {
				shouldChat = false;
			},
		});

		if (!shouldChat || config.chat.disable) return;

		const formattedMessage = getKey("chat.format").replace("%s%", player.username).replace("%d%", message);

		if (!message.trim()) return;

		if (message.includes("§") || (message.length > 256 && config.chat.blockInvalidMessages)) {
			Frog.eventEmitter.emit("playerMalformatedChatMessage", {
				server,
				player,
				message,
			});
			return;
		}

		Logger.info(formattedMessage);

		for (const player of PlayerInfo.players) {
			player.sendMessage(formattedMessage);
		}
	}
}

module.exports = ClientTextPacket;
