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
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Packet = require("./Packet");

class ServerMoveEntityDataPacket extends Packet {
	name = "move_entity_delta";

	/** @type {import("Frog").Coordinate } */
	coordinates = { x: 0, y: 0, z: 0 };
	/** @type {number | undefined} */
	runtime_entity_id;
	/** @type {import("Frog").EntityMovementFlags | undefined} */
	flags;
	/** @type {import("Frog").Coordinate} */
	coordinatesRotation = { x: 0, y: 0, z: 0 };

	/**
	 * @param {import("Frog").Player} player
	 */
	writePacket(player) {
		player.queue(this.name, {
			runtime_entity_id: this.runtime_entity_id,
			flags: this.flags,
			x: this.coordinates.x,
			y: this.coordinates.y,
			z: this.coordinates.z,
			rotation_x: this.coordinatesRotation.x,
			rotation_y: this.coordinatesRotation.y,
			rotation_z: this.coordinatesRotation.z,
		});
	}
}

module.exports = ServerMoveEntityDataPacket;
