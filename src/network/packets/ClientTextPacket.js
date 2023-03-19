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

const PlayerChatEvent = require("../../events/PlayerChatEvent");

class ClientTextPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns The name of the packet
	 */
	getPacketName() {
		return "text"
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
	async validatePacket(player, message) {
		assert(player, null)
		assert(message, "")
	}

	/**
	 * Reads the packet from player
	 * @param {any} player
	 * @param {JSON} packet
	 */
	async readPacket(player, packet, server) {
		let message = packet.data.params.message

		await this.validatePacket(player, message)

		const chatevent = new PlayerChatEvent()
		chatevent.execute(server, player, message)
	}
}

module.exports = ClientTextPacket;