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
const PacketConstructor = require("./PacketConstructor");

let x = 0;
let y = 0;
let z = 0;
let runtime_entity_id = 0;
let flags = 0;
let rot_x = 0;
let rot_y = 0;
let rot_z = 0;

class ServerMoveEntityDataPacket extends PacketConstructor {
	/**
	 * Returns the name of the packet
	 * @returns {string}
	 */
	getPacketName() {
		return "move_entity_delta";
	}

	/**
	 * Returns the runtime entity ID
	 * @returns {float} The runtime entity ID
	 */
	getRuntimeEntityId() {
		return runtime_entity_id;
	}

	/**
	 * Sets the runtime entity ID
	 * @param {float} value - The runtime entity ID value to set
	 */
	setRuntimeEntityId(value) {
		runtime_entity_id = value;
	}

	/**
	 * Returns The X coordinate
	 * @returns {float} The X coordinate
	 */
	getX() {
		return x;
	}

	/**
	 * Sets the X coordinate
	 * @param {float} value - The X coordinate value to set
	 */
	setX(value) {
		x = value;
	}

	/**
	 * Returns the Y coordinate
	 * @returns {float} The Y coordinate
	 */
	getY() {
		return y;
	}

	/**
	 * Sets the Y coordinate
	 * @param {float} value - The Y coordinate value to set
	 */
	setY(value) {
		y = value;
	}

	/**
	 * Returns the z coordinate
	 * @returns {float} The z coordinate
	 */
	getZ() {
		return z;
	}

	/**
	 * Sets the z coordinate
	 * @param {float} value - The z coordinate value to set
	 */
	setZ(value) {
		z = value;
	}

	/**
	 * Returns the X rotation
	 * @returns {float} The X rotation
	 */
	getRotX() {
		return rot_x;
	}

	/**
	 * Sets the X rotation
	 * @param {float} value - The X rotation value to set
	 */
	setRotX(value) {
		rot_x = value;
	}

	/**
	 * Returns the Y rotation
	 * @returns {float} The Y rotation
	 */
	getRotY() {
		return rot_y;
	}

	/**
	 * Sets the Y rotation
	 * @param {float} value - The Y rotation value to set
	 */
	setRotY(value) {
		rot_y = value;
	}

	/**
	 * Returns the Z rotation
	 * @returns {float} The Z rotation
	 */
	getRotZ() {
		return rot_z;
	}

	/**
	 * Sets the Z rotation
	 * @param {float} value - The Z rotation value to set
	 */
	setRotZ(value) {
		rot_z = value;
	}

	/**
	 * Sets the flags
	 * @param {float} value - The flags value to set
	 */
	setFlags(value) {
		flags = value;
	}

	/**
	 * Returns the flags
	 * @returns {JSON} The flags
	 */
	getFlags() {
		return flags;
	}

	/**
	 * Writes the packet to the client queue
	 * @param {Client} client - The client to send the packet to
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			runtime_entity_id: this.getRuntimeEntityId(),
			flags: this.getFlags(),
			x: this.getX(),
			y: this.getY(),
			z: this.getZ(),
			rot_x: this.getRotX(),
			rot_y: this.getRotY(),
			rot_z: this.getRotZ(),
		});
	}
}

module.exports = ServerMoveEntityDataPacket;
