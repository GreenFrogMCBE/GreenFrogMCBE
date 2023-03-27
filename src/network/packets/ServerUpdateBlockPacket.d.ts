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
export = ServerUpdateBlockPacket;
declare class ServerUpdateBlockPacket extends PacketConstructor {
	/**
	 * Sets the X coordinate
	 * @param {Number} new_x
	 */
	setX(new_x: number): void;
	/**
	 * Sets the Y coordinate
	 * @param {Number} new_y
	 */
	setY(new_y: number): void;
	/**
	 * Sets the Z coordinate
	 * @param {Number} new_z
	 */
	setZ(new_z: number): void;
	/**
	 * Sets the block runtime id
	 * @param {Number} new_block_runtime_id
	 */
	setBlockRuntimeId(new_block_runtime_id: number): void;
	/**
	 * Sets the flags count (aka flags value).
	 * @param {Number} new_flags_value
	 */
	setFlagsValue(new_flags_value: number): void;
	/**
	 * Sets the flag value called "neighbors".
	 * @param {Number} new_neighbors
	 */
	setNeighbors(new_neighbors: number): void;
	/**
	 * Sets the flag value called "network".
	 * @param {Number} new_network
	 */
	setNetwork(new_network: number): void;
	/**
	 * Sets the flag value called "no_graphic".
	 * @param {Number} new_no_graphic
	 */
	setNoGraphic(new_no_graphic: number): void;
	/**
	 * Sets the flags value called "unused".
	 * @param {Number} new_unused
	 */
	setUnused(new_unused: number): void;
	/**
	 * Sets the flag value called "priority".
	 * @param {Number} new_priority
	 */
	setPriority(new_priority: number): void;
	/**
	 * Sets the layer.
	 * @param {Number} new_layer
	 */
	setLayer(new_layer: number): void;
	/**
	 * Returns the X coordinate.
	 * @returns {Number} The X coordinate.
	 */
	getX(): number;
	/**
	 * Returns the Y coordinate.
	 * @returns {Number} The Y coordinate.
	 */
	getY(): number;
	/**
	 * Returns the Z coordinate.
	 * @returns {Number} The Z coordinate.
	 */
	getZ(): number;
	/**
	 * Returns the block runtime id.
	 * @returns {Number} The block runtime id.
	 */
	getBlockRuntimeId(): number;
	/**
	 * Returns the flags value.
	 * @returns {Number} The flags value.
	 */
	getFlagsValue(): number;
	/**
	 * Returns the flag value called "neighbors".
	 * @returns {Number} The flag value called "neighbors".
	 */
	getNeighbors(): number;
	/**
	 * Returns the flag value called "network".
	 * @returns {Number} The flag value called "network".
	 */
	getNetwork(): number;
	/**
	 * Returns the flag value called "no_graphic".
	 * @returns {Number} The flag value called "no_graphic".
	 */
	getNoGraphic(): number;
	/**
	 * Returns the flags value called "unused".
	 * @returns {Number} The flags value called "unused".
	 */
	getUnused(): number;
	/**
	 * Returns the flags value called "priority".
	 * @returns {Number} The flags value called "priority".
	 */
	getPriority(): number;
	/**
	 * Returns the layer.
	 * @returns {Number} The layer.
	 */
	getLayer(): number;
	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
