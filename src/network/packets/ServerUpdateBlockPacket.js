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

class ServerUpdateBlockPacket extends Packet {
	name = "update_block"

	/** @type {Possibl} */
	x
	/** @type {number | undefined} */
	y
	/** @type {number | undefined} */
	z
	/** @type {number | undefined} */
	block_runtime_id
	/** @type {boolean | undefined} */
	neighbors
	/** @type {boolean | undefined} */
	network
	/** @type {boolean | undefined} */
	no_graphic
	/** @type {boolean | undefined} */
	unused
	/** @type {boolean | undefined} */
	priority
	/** @type {number | undefined} */
	layer
	/** @type {number | undefined} */
	flags_value

	/**
	 * @param {import("Frog").Player} player
	 */
	write_packet(player) {
		player.queue(this.name, {
			position: {
				x: this.x,
				y: this.y,
				z: this.z,
			},
			block_runtime_id: this.block_runtime_id,
			flags: {
				_value: this.flags_value,
				neighbors: this.neighbors,
				network: this.network,
				no_graphic: this.no_graphic,
				unused: this.unused,
				priority: this.priority,
			},
			layer: this.layer,
		})
	}
}

module.exports = ServerUpdateBlockPacket
