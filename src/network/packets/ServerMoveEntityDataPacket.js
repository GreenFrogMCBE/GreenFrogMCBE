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
const Packet = require("./Packet")

const {Vec3} = require("@greenfrog/mc-enums")

class ServerMoveEntityDataPacket extends Packet {
	name = "move_entity_delta"

	/** @type {Vec3} */
	coordinates = new Vec3(0, 0, 0)

	/** @type {number} */
	runtime_entity_id

	/** @type {import("Frog").EntityMovementFlags | undefined} */
	flags

	/** @type {import("Frog").Vec3 } */
	coordinates_rotation = { x: 0, y: 0, z: 0 }

	/**
	 * @param {import("Frog").Player} player
	 */
	write_packet(player) {
		player.queue(this.name, {
			runtime_entity_id: this.runtime_entity_id,
			flags: this.flags,
			x: this.coordinates.x,
			y: this.coordinates.y,
			z: this.coordinates.z,
			rotation_x: this.coordinates_rotation.x,
			rotation_y: this.coordinates_rotation.y,
			rotation_z: this.coordinates_rotation.z,
		})
	}
}

module.exports = ServerMoveEntityDataPacket
