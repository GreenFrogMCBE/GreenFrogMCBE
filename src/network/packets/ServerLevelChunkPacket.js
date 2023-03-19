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
let x = 0;
let z = 0;
let sub_chunk_count = 0;
let cache_enabled = false;
let payload = [];

const PacketConstructor = require("./PacketConstructor");

class LevelChunk extends PacketConstructor {
	/**
	* Returns the packet name
	* @returns The name of the packet
	*/
	getPacketName() {
		return "level_chunk";
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
	 * @param {Number} x1
	 */
	setX(x1) {
		x = x1;
	}

	/**
	 * It sets the Z coordinate
	 * @param {Number} z1
	 */
	setZ(z1) {
		z = z1;
	}

	/**
	 * It sets the sub chunk count
	 * @param {Number} count
	 */
	setSubChunkCount(count) {
		sub_chunk_count = count;
	}

	/**
	 * It sets if the cache is enabled
	 * @param {Boolean} enabled
	 */
	setCacheEnabled(enabled) {
		cache_enabled = enabled;
	}

	/**
	 * It sets if the payload
	 * @param {any} data
	 */
	setPayload(data) {
		payload = data;
	}

	/**
	 * It gets the X coordinate
	 * @returns {Number}
	 */
	getX() {
		return x;
	}

	/**
	 * It gets the Z coordinate
	 * @returns {Number}
	 */
	getZ() {
		return z;
	}

	/**
	 * It gets the sub chunk count
	 * @returns {Number}
	 */
	getSubChunkCount() {
		return sub_chunk_count;
	}

	/**
	 * It gets if the cache is enabled
	 * @returns {Boolean}
	 */
	getCacheEnabled() {
		return cache_enabled;
	}

	/**
	 * It gets the payload
	 * @returns {any}
	 */
	getPayload() {
		return payload;
	}

	/**
	 * It writePackets the packet
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.name(), {
			x: this.getX(),
			z: this.getZ(),
			sub_chunk_count: this.getSubChunkCount(),
			cache_enabled: this.getCacheEnabled(),
			payload: { type: "Buffer", data: this.getPayload() },
		});
	}
}

module.exports = LevelChunk;
