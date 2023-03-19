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
const PacketConstructor = require("./PacketConstructor");

const assert = require('assert');

const PacketHandlingError = require("./exceptions/PacketHandlingError")

class ClientSetPlayerGameTypePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns The name of the packet
	 */
	getPacketName() {
		return "set_player_game_type"
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}

	/**
	 * Validates the packet
	 * @param {any} player
	 * @param {JSON} packet
	 * @param {any} server
	 */
	async validatePacket(player, packet) {
		assert(player, null)

		if (!packet.data.params.gamemode) throw new PacketHandlingError("Bad gamemode packet - Bad gamemode")

        if (!player.op) throw new PacketHandlingError("Bad gamemode packet - Tried to switch gamemode, while not opped")
	}

	/**
	 * Reads the packet from player
	 * @param {any} player
	 * @param {JSON} packet
	 */
	async readPacket(player, packet) {
		await this.validatePacket(player, packet)

		player.setGamemode(packet.data.params.gamemode)
	}
}

module.exports = ClientSetPlayerGameTypePacket;