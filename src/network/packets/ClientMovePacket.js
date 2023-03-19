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

const PacketHandlingException = require('./exceptions/PacketHandlingError')

class ClientMovePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns The name of the packet
	 */
	getPacketName() {
		return "move_player"
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
	async validatePacket(player, packet, server) {
		assert(player, null)
		JSON.parse(packet)
		assert(server, null)

		if (Math.abs(packet.data.params.position.x) > Math.E ||
			Math.abs(packet.data.params.position.y) > Math.E ||
			Math.abs(packet.data.params.position.z) > Math.E
		) {
			throw new PacketHandlingException("Invalid position in ClientMovePlayer packet!")
		}
	}

	/**
	 * Reads the packet from player
	 * @param {any} player
	 * @param {JSON} packet
	 */
	async readPacket(player, packet, server) {
		await this.validatePacket(player, packet, server)

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