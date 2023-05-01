const PacketConstructor = require("./PacketConstructor");

const Frog = require("../../Frog");

class ClientRequestChunkRadiusPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "request_chunk_radius";
	}

	/**
	 * Returns if the packet is critical?
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Reads the packet from player
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} server
	 */
	async readPacket(player, packet, server) {
		let shouldChange = true;

		Frog.eventEmitter.emit("playerRequestChunkRadius", {
			radius: packet.data.params.radius,
			player,
			server,
			cancel: () => {
				shouldChange = false;
			},
		});

		if (!shouldChange) return;

		player.setChunkRadius(32);
	}
}

module.exports = ClientRequestChunkRadiusPacket;
