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
const World = require("../../world/World");

const PacketHandlingError = require("./exceptions/PacketHandlingError");

const PacketConstructor = require("./PacketConstructor");

class ClientSetDifficultyPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string} The name of the packet
	 */
	getPacketName() {
		return "set_difficulty";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false;
	}

	async validatePacket(player) {
		if (!player.op) throw new PacketHandlingError("Invalid set difficulty packet! Cannot update the server difficulty without being OP");
	}

	/**
	 * Reads the packet from player
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} server
	 */
	async readPacket(player, packet, server) {
		await this.validatePacket(player);

		const difficulty = packet.data.params.difficulty;

		Frog.eventEmitter.emit('playerSetDifficulty', {
			player,
			server,
			difficulty
		})

		for (const player of new World().getPlayersInWorld()) {
			player.setDifficulty(difficulty);
		}
	}
}

module.exports = ClientSetDifficultyPacket;
