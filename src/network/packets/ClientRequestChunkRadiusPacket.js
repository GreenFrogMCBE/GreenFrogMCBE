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
const PlayerRequestChunkRadiusEvent = require("../../events/PlayerRequestChunkRadiusEvent");

class ClientRequestChunkRadiusPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
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
     * Reads the packet from player
     * @param {any} player
     * @param {JSON} packet
     */
	async readPacket(player, packet, server) {
		await this.validatePacket(player)

		const requestRadiusEvent = new PlayerRequestChunkRadiusEvent()
		requestRadiusEvent.player = player
		requestRadiusEvent.server = server
		requestRadiusEvent.radius = packet.data.params.radius
		requestRadiusEvent.execute()
	}
}

module.exports = ClientRequestChunkRadiusPacket;