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

class ServerUpdateBlockPacket extends PacketConstructor {
	name = 'update_block'
	/** @type {number} */
	x;
	/** @type {number} */
	y;
	/** @type {number} */
	z
	/** @type {number} */
	block_runtime_id
	/** @type {boolean} */
	neighbors
	/** @type {boolean} */
	network
	/** @type {boolean} */
	no_graphic
	/** @type {boolean} */
	unused
	/** @type {boolean} */
	priority
	/** @type {number} */
	layer
	/** @type {number} */
	flags_value

	writePacket(client) {
		client.queue(this.name, {
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
		});
	}
}

module.exports = ServerUpdateBlockPacket;
