const Frog = require("../../Frog");

const PacketConstructor = require("./PacketConstructor");

class ClientModalFormResponsePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "modal_form_response";
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
	 *
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} player
	 */
	async readPacket(player, packet, server) {
		Frog.eventEmitter.emit("playerFormResponse", {
			player,
			formData: packet,
			server,
		});
	}
}

module.exports = ClientModalFormResponsePacket;
