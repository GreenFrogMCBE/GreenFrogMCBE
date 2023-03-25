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
		return false;
	}

	/**
	 * Sets the X coordinate
	 * @param {Number} new_x
	 */
	setX(new_x) {
		x = parseInt(new_x);
	}

	/**
	 * Sets the Y coordinate
	 * @param {Number} new_y
	 */
	setY(new_y) {
		y = parseInt(new_y);
	}

	/**
	 * Sets the Z coordinate
	 * @param {Number} new_z
	 */
	setZ(new_z) {
		z = parseInt(new_z);
	}

	/**
	 * Sets the block runtime id
	 * @param {Number} new_block_runtime_id
	 */
	setBlockRuntimeId(new_block_runtime_id) {
		block_runtime_id = parseInt(new_block_runtime_id);
	}

	/**
	 * Sets the flags count (aka flags value).
	 * @param {Number} new_flags_value
	 */
	setFlagsValue(new_flags_value) {
		flagsvalue = parseInt(new_flags_value);
	}

	/**
	 * Sets the flag value called "neighbors".
	 * @param {Number} new_neighbors
	 */
	setNeighbors(new_neighbors) {
		neighbors = new_neighbors;
	}

	/**
	 * Sets the flag value called "network".
	 * @param {Number} new_network
	 */
	setNetwork(new_network) {
		network = new_network;
	}
	/**
	 * Sets the flag value called "no_graphic".
	 * @param {Number} new_no_graphic
	 */
	setNoGraphic(new_no_graphic) {
		no_graphic = new_no_graphic;
	}

	/**
	 * Sets the flags value called "unused".
	 * @param {Number} new_unused
	 */
	setUnused(new_unused) {
		unused = new_unused;
	}

	/**
	 * Sets the flag value called "priority".
	 * @param {Number} new_priority
	 */
	setPriority(new_priority) {
		priority = new_priority;
	}

	/**
	 * Sets the layer.
	 * @param {Number} new_layer
	 */
	setLayer(new_layer) {
		layer = parseInt(new_layer);
	}
	/**
	 * Returns the X coordinate.
	 * @returns {Number} The X coordinate.
	 */
	getX() {
		return x;
	}

	/**
	 * Returns the Y coordinate.
	 * @returns {Number} The Y coordinate.
	 */
	getY() {
		return y;
	}

	/**
	 * Returns the Z coordinate.
	 * @returns {Number} The Z coordinate.
	 */
	getZ() {
		return z;
	}

	/**
	 * Returns the block runtime id.
	 * @returns {Number} The block runtime id.
	 */
	getBlockRuntimeId() {
		return block_runtime_id;
	}

	/**
	 * Returns the flags value.
	 * @returns {Number} The flags value.
	 */
	getFlagsValue() {
		return flagsvalue;
	}

	/**
	 * Returns the flag value called "neighbors".
	 * @returns {Number} The flag value called "neighbors".
	 */
	getNeighbors() {
		return neighbors;
	}

	/**
	 * Returns the flag value called "network".
	 * @returns {Number} The flag value called "network".
	 */
	getNetwork() {
		return network;
	}

	/**
	 * Returns the flag value called "no_graphic".
	 * @returns {Number} The flag value called "no_graphic".
	 */
	getNoGraphic() {
		return no_graphic;
	}

	/**
	 * Returns the flags value called "unused".
	 * @returns {Number} The flags value called "unused".
	 */
	getUnused() {
		return unused;
	}

	/**
	 * Returns the flags value called "priority".
	 * @returns {Number} The flags value called "priority".
	 */
	getPriority() {
		return priority;
	}

	/**
	 * Returns the layer.
	 * @returns {Number} The layer.
	 */
	getLayer() {
		return layer;
	}

	/**
	 * Sends the packet to the client
	 * @param {any} client
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
