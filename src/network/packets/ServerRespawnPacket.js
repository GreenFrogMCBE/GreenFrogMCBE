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

// !!! This packet is no longer used
// (this file will not be deleted, even if its not used anymore, so you can use this packet to respawn the packet using packet API in your plugin)

let pos = {
	x: 0,
	y: 0,
	z: 0,
};
let state = 0;
let runtime_entity_id = 0;

const PacketConstructor = require("./PacketConstructor");

class Respawn extends PacketConstructor {
	/**
	* Returns the packet name
	* @returns The name of the packet
	*/
	getPacketName() {
		return "respawn";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}

	/**
	 * It returns the position.
	 * @return {JSON} The position.
	 */
	getPosition() {
		return pos;
	}

	/**
	 * Returns the state.
	 * @returns The state.
	 */
	getState() {
		return state;
	}

	/**
	 * Returns the runtime entity id.
	 * @returns The runtime entity id.
	 */
	getRuntimeEntityId() {
		return runtime_entity_id;
	}

	/**
	 * This functions sets the position.
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
	 * This functions sets the state.
	 * @param {Number} state1
	 */
	setState(state1) {
		state = state1;
	}

	/***
	 * This function sets the runtime_entity_id
	 * @param {Number} id1 - The Runtime ID of the entity
	 */
	setRuntimeEntityId(id1) {
		runtime_entity_id = id1;
	}

	/***
	 * Queue packet to client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			position: this.getPosition(),
			state: this.getState(),
			runtime_entity_id: this.getRuntimeEntityId(),
		});
	}
}

module.exports = Respawn;
