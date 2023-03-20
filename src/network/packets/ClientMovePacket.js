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

const PlayerMoveEvent = require('../../events/PlayerMoveEvent')

class ClientMovePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "move_player"
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}

	/**
	 * Validates the packet
	 * @param {any} player
	 */
	async validatePacket(player) {
		assert(player, null)
	}

	/**
	 * Reads the packet from player
	 * @param {any} player
	 * @param {JSON} packet
	 * @param {any} server
	 */
	async readPacket(player, packet, server) {
		await this.validatePacket(player)

		let position = packet.data.params.position

		const move_event = new PlayerMoveEvent()
		move_event.execute(
			server,
			player,
			position
		)

		player.x = position.x
		player.y = position.y
		player.z = position.z
	}
}

module.exports = ClientMovePacket;