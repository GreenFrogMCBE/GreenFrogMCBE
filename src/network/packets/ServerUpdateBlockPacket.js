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

class ServerUpdateBlockPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "update_block";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the X coordinate
	 * @param {number} new_x
	 */
	setX(new_x) {
		x = parseInt(new_x);
	}

	/**
	 * Sets the Y coordinate
	 * @param {number} new_y
	 */
	setY(new_y) {
		y = parseInt(new_y);
	}

	/**
	 * Sets the Z coordinate
	 * @param {number} new_z
	 */
	setZ(new_z) {
		z = parseInt(new_z);
	}

	/**
	 * Sets the block runtime id
	 * @param {number} new_block_runtime_id
	 */
	setBlockRuntimeId(new_block_runtime_id) {
		block_runtime_id = parseInt(new_block_runtime_id);
	}

	/**
	 * Sets the flags count (aka flags value).
	 * @param {number} new_flags_value
	 */
	setFlagsValue(new_flags_value) {
		flagsvalue = parseInt(new_flags_value);
	}

	/**
	 * Sets the flag value called "neighbors".
	 * @param {number} new_neighbors
	 */
	setNeighbors(new_neighbors) {
		neighbors = new_neighbors;
	}

	/**
	 * Sets the flag value called "network".
	 * @param {number} new_network
	 */
	setNetwork(new_network) {
		network = new_network;
	}
	/**
	 * Sets the flag value called "no_graphic".
	 * @param {number} new_no_graphic
	 */
	setNoGraphic(new_no_graphic) {
		no_graphic = new_no_graphic;
	}

	/**
	 * Sets the flags value called "unused".
	 * @param {number} new_unused
	 */
	setUnused(new_unused) {
		unused = new_unused;
	}

	/**
	 * Sets the flag value called "priority".
	 * @param {number} new_priority
	 */
	setPriority(new_priority) {
		priority = new_priority;
	}

	/**
	 * Sets the layer.
	 * @param {number} new_layer
	 */
	setLayer(new_layer) {
		layer = parseInt(new_layer);
	}
	/**
	 * Returns the X coordinate.
	 * @returns {number} The X coordinate.
	 */
	getX() {
		return x;
	}

	/**
	 * Returns the Y coordinate.
	 * @returns {number} The Y coordinate.
	 */
	getY() {
		return y;
	}

	/**
	 * Returns the Z coordinate.
	 * @returns {number} The Z coordinate.
	 */
	getZ() {
		return z;
	}

	/**
	 * Returns the block runtime id.
	 * @returns {number} The block runtime id.
	 */
	getBlockRuntimeId() {
		return block_runtime_id;
	}

	/**
	 * Returns the flags value.
	 * @returns {number} The flags value.
	 */
	getFlagsValue() {
		return flagsvalue;
	}

	/**
	 * Returns the flag value called "neighbors".
	 * @returns {number} The flag value called "neighbors".
	 */
	getNeighbors() {
		return neighbors;
	}

	/**
	 * Returns the flag value called "network".
	 * @returns {number} The flag value called "network".
	 */
	getNetwork() {
		return network;
	}

	/**
	 * Returns the flag value called "no_graphic".
	 * @returns {number} The flag value called "no_graphic".
	 */
	getNoGraphic() {
		return no_graphic;
	}

	/**
	 * Returns the flags value called "unused".
	 * @returns {number} The flags value called "unused".
	 */
	getUnused() {
		return unused;
	}

	/**
	 * Returns the flags value called "priority".
	 * @returns {number} The flags value called "priority".
	 */
	getPriority() {
		return priority;
	}

	/**
	 * Returns the layer.
	 * @returns {number} The layer.
	 */
	getLayer() {
		return layer;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
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

module.exports = ServerUpdateBlockPacket;
