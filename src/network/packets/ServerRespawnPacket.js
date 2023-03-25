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

let pos = {
	x: 0,
	y: 0,
	z: 0,
};
let state = 0;
let runtime_entity_id = 0;

const PacketConstructor = require("./PacketConstructor");

class ServerRespawnPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "respawn";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Returns the position.
	 * @returns {JSON} The position.
	 */
	getPosition() {
		return pos;
	}

	/**
	 * Returns the packet state.
	 * @returns {String} The state.
	 */
	getState() {
		return state;
	}

	/**
	 * Returns the runtime entity id.
	 * @returns {Number} The runtime entity id.
	 */
	getRuntimeEntityId() {
		return runtime_entity_id;
	}

	/**
	 * Sets the respawn position.
	 * @param {Number} x - The X coordinate.
	 * @param {Number} y - The Y coordinate.
	 * @param {Number} z - The Z coordinate.
	 */
	setPosition(x, y, z) {
		pos.x = x;
		pos.y = y;
		pos.z = z;
	}

	/**
	 * Sets the packet state.
	 * @param {Number} new_packet_state
	 */
	setState(new_packet_state) {
		state = new_packet_state;
	}

	/**
	 * Sets the runtime entity id
	 * @param {Number} new_id
	 */
	setRuntimeEntityId(new_id) {
		runtime_entity_id = new_id;
	}

	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			position: this.getPosition(),
			state: this.getState(),
			runtime_entity_id: this.getRuntimeEntityId(),
		});
	}
}

module.exports = ServerRespawnPacket;
