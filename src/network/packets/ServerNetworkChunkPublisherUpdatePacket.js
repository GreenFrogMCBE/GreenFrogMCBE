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
let cords = {
	x: 0,
	y: 0,
	z: 0,
};
let radius = 64;
let saved_chunks = [];

const PacketConstructor = require("./PacketConstructor");

class NetworkChunkPublisherUpdate extends PacketConstructor {
	/**
	* Returns the packet name
	* @returns The name of the packet
	*/
	getPacketName() {
		return "network_chunk_publisher_update";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}


	/**
	 * It sets the coordinates of the chunk
	 * @param x - The X coordinate of the player.
	 * @param y - The Y coordinate of the player.
	 * @param z - The Z coordinate of the player.
	 */
	setCords(x, y, z) {
		cords.x = x;
		cords.y = y;
		cords.z = z;
	}

	/**
	 * It sets the radius
	 * @param radius1 - The radius.
	 */
	setRadius(radius1) {
		radius = radius1;
	}

	/**
	 * It sets the saved chunks
	 * @param chunks - An array of saved chunks.
	 */
	setSavedChunks(chunks) {
		saved_chunks = chunks;
	}

	/**
	 * It returns the coordinates.
	 * @returns The coordinates.
	 */
	getCords() {
		return cords;
	}

	/**
	 * It returns the radius.
	 * @returns The radius.
	 */
	getRadius() {
		return radius;
	}

	/**
	 * It returns the saved_chunks.
	 * @returns The saved_chunks.
	 */
	getSavedChunks() {
		return saved_chunks;
	}

	send(client) {
		this.validate(client);
		client.queue(this.getPacketName(), {
			coordinates: this.getCords(),
			radius: this.getRadius(),
			saved_chunks: this.getSavedChunks(),
		});
	}
}

module.exports = NetworkChunkPublisherUpdate;
