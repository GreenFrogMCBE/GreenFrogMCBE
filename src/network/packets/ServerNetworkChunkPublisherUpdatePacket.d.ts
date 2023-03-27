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
export = ServerNetworkChunkPublisherUpdatePacket;
declare class ServerNetworkChunkPublisherUpdatePacket extends PacketConstructor {
	/**
	 * Sets the coordinates of the chunk to load
	 *
	 * @param x - The X coordinate.
	 * @param y - The Y coordinate.
	 * @param z - The Z coordinate.
	 */
	setCords(x: any, y: any, z: any): void;
	/**
	 * Sets the radius of chunks for client to load
	 * @param new_radius
	 */
	setRadius(new_radius: any): void;
	/**
	 * Sets the list saved chunks
	 * @param new_saved_chunks
	 */
	setSavedChunks(new_saved_chunks: any): void;
	/**
	 * Returns the coordinates of chunks to load.
	 * @returns {JSON} The coordinates.
	 */
	getCords(): JSON;
	/**
	 * Returns the radius of chunks to load.
	 * @returns {Number} The radius.
	 */
	getRadius(): number;
	/**
	 * Returns the list of saved chunks.
	 * @returns {Array} The list of saved chunks.
	 */
	getSavedChunks(): Array;
	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
