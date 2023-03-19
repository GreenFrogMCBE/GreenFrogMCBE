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
const PacketConstructor = require("./PacketConstructor");

let x = 0;
let y = 0;
let z = 0;
let block_runtime_id = 0;
let flagsvalue = 0;
let neighbors = false;
let network = false;
let no_graphic = false;
let unused = false;
let priority = false;
let layer = 0;

// !!! This packet is no longer used
// (this file will not be deleted, even if its not used anymore, so you can use this packet to update blocks using packet API in your plugin)

class UpdateBlock extends PacketConstructor {
	/**
	* Returns the packet name
	* @returns The name of the packet
	*/
	getPacketName() {
		return "update_block";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}
	
	/**
	 * It sets the X coordinate
	 * @param {Number} x1 - The X coordinate.
	 */
	setX(x1) {
		x = parseInt(x1);
	}

	/**
	 * It sets the Y coordinate
	 * @param {Number} y1 - The Y coordinate.
	 */
	setY(y1) {
		y = parseInt(y1);
	}

	/**
	 * It sets the Z coordinate
	 * @param {Number} z1 - The Z coordinate.
	 */
	setZ(z1) {
		z = parseInt(z1);
	}

	/**
	 * It sets the block runtime id
	 * @param {Number} block_runtime_id1 - It sets the block runtime id.
	 */
	setBlockRuntimeId(block_runtime_id1) {
		block_runtime_id = parseInt(block_runtime_id1);
	}

	/**
	 * It sets the flags value
	 * @param {Number} flagsvalue1 - It sets the flags count (aka flags value).
	 */
	setFlagsValue(flagsvalue1) {
		flagsvalue = parseInt(flagsvalue1);
	}

	/**
	 * It sets the flags value called "neighbors"
	 * @param {Number} neighbors1 - It sets the flag value called "neighbors".
	 */
	setNeighbors(neighbors1) {
		neighbors = neighbors1;
	}

	/**
	 * It sets the flags value called "network"
	 * @param {Number} network1 - It sets the flag value called "network".
	 */
	setNetwork(network1) {
		network = network1;
	}

	/**
	 * It sets the flags value called "no_graphic"
	 * @param {Number} no_graphic1 - It sets the flag value called "no_graphic".
	 */
	setNoGraphic(no_graphic1) {
		no_graphic = no_graphic1;
	}

	/**
	 * It sets the flags value called "unused"
	 * @param {Number} unused1 - It sets the flags value called "unused".
	 */
	setUnused(unused1) {
		unused = unused1;
	}

	/**
	 * It sets the flags value called "priority"
	 * @param {Number} priority1 - It sets the flag value called "priority".
	 */
	setPriority(priority1) {
		priority = priority1;
	}

	/**
	 * It sets the layer
	 * @param {Number} layer1 - It sets the layer.
	 */
	setLayer(layer1) {
		layer = parseInt(layer1);
	}

	/**
	 * It returns the X coordinate
	 * @param {Number} x - The X coordinate.
	 */
	getX() {
		return x;
	}

	/**
	 * It returns the Y coordinate
	 * @param {Number} y - The Y coordinate.
	 */
	getY() {
		return y;
	}

	/**
	 * It returns the Z coordinate
	 * @param {Number} z - The Z coordinate.
	 */
	getZ() {
		return z;
	}

	/**
	 * It returns the block runtime id
	 * @param {Number} block_runtime_id - It returns the block runtime id.
	 */
	getBlockRuntimeId() {
		return block_runtime_id;
	}

	/**
	 * It returns the flags value
	 * @param {Number} flagsvalue - It returns the flags value.
	 */
	getFlagsValue() {
		return flagsvalue;
	}

	/**
	 * It returns the flags value called "neighbors"
	 * @param {Number} neighbors - It returns the flag value called "neighbors".
	 */
	getNeighbors() {
		return neighbors;
	}

	/**
	 * It returns the flags value called "network"
	 * @param {Number} network - It sets the flag value called "network".
	 */
	getNetwork() {
		return network;
	}

	/**
	 * It returns the flags value called "no_graphic"
	 * @param {Number} no_graphic - It sets the flag value called "no_graphic".
	 */
	getNoGraphic() {
		return no_graphic;
	}

	/**
	 * It returns the flags value called "unused"
	 * @param {Number} unused - It returns the flags value called "unused".
	 */
	getUnused() {
		return unused;
	}

	/**
	 * It returns the flags value called "priority"
	 * @param {Number} priority - It returns the flags value called "priority".
	 */
	getPriority() {
		return priority;
	}

	/**
	 * It returns the layer
	 * @param {Number} layer - It returns the layer.
	 */
	getLayer() {
		return layer;
	}

	/**
	 * @param {Object} client - The client that you want to writePacket the packet to.
	 * @param {Number} x - The x coordinate of the block
	 * @param {Number} y - The y coordinate of the block
	 * @param {Number} z - The z coordinate of the block
	 * @param {Number} block_runtime_id - The block ID of the block you want to place.
	 */
	writePacket(client) {
		client.queue(this.name(), {
			position: {
				x: this.getX(),
				y: this.getY(),
				z: this.getZ(),
			},
			block_runtime_id: this.getBlockRuntimeId(),
			flags: {
				_value: this.getFlagsValue(),
				neighbors: this.getNeighbors(),
				network: this.getNetwork(),
				no_graphic: this.getNoGraphic(),
				unused: this.getUnused(),
				priority: this.getPriority(),
			},
			layer: this.getLayer(),
		});
	}
}

module.exports = UpdateBlock;
