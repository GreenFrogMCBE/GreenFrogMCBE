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

const Frog = require("../../Frog");

class ClientRequestChunkRadiusPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string} The name of the packet
	 */
	getPacketName() {
		return "request_chunk_radius";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Reads the packet from player
	 * 
	 * @param {Client} player
	 * @param {JSON} packet
	 */
	async readPacket(player, packet, server) {
		let shouldChange = true
		
		Frog.eventEmitter.emit('playerRequestChunkRadius', {
			radius: packet.data.params.radius,
			player,
			server,
			cancel() {
				shouldChange = false
			}
		})

		if (!shouldChange) return
	
		player.setChunkRadius(32);
	}
}

module.exports = ClientRequestChunkRadiusPacket;
