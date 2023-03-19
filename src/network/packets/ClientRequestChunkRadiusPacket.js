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

const PlayerRequestChunkRadiusEvent = require("../../events/PlayerRequestChunkRadiusEvent");

class ClientRequestChunkRadiusPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns The name of the packet
	 */
	getPacketName() {
		return "request_chunk_radius"
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
	}

	/**
     * Reads the packet from player
     * @param {any} player
     * @param {JSON} packet
     */
	async readPacket(player, packet, server) {
		await this.validatePacket(player, packet, server)

		const requestradiusevent = new PlayerRequestChunkRadiusEvent()
		requestradiusevent.execute(
			packet,
			server,
			packet.data.params.radius
		)
	}
}

module.exports = ClientRequestChunkRadiusPacket;