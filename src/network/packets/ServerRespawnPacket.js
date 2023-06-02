/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
let position = {};
let state = 0;
let runtime_entity_id = 0;

const PacketConstructor = require("./PacketConstructor");

class ServerRespawnPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "respawn";
	}

	/**
	 * Returns the position.
	 * @returns {JSON} The position.
	 */
	getPosition() {
		return position;
	}

	/**
	 * Returns the packet state.
	 * @returns {string} The state.
	 */
	getState() {
		return state;
	}

	/**
	 * Returns the runtime entity id.
	 * @returns {number} The runtime entity id.
	 */
	getRuntimeEntityId() {
		return runtime_entity_id;
	}

	/**
	 * Sets the respawn position.
	 * @param {number} x - The X coordinate.
	 * @param {number} y - The Y coordinate.
	 * @param {number} z - The Z coordinate.
	 */
	setPosition(x, y, z) {
		position.x = x;
		position.y = y;
		position.z = z;
	}

	/**
	 * Sets the packet state.
	 * @param {number} new_packet_state
	 */
	setState(new_packet_state) {
		state = new_packet_state;
	}

	/**
	 * Sets the runtime entity id
	 * @param {number} new_id
	 */
	setRuntimeEntityId(new_id) {
		runtime_entity_id = new_id;
	}

	/**
	 * Sends the packet to the client
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

module.exports = ServerRespawnPacket;
