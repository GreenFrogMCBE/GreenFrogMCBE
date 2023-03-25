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

class ServerLevelChunkPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "level_chunk";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the X coordinate
	 * @param {Number} new_x
	 */
	setX(new_x) {
		x = new_x;
	}

	/**
	 * Sets the Z coordinate
	 * @param {Number} new_z
	 */
	setZ(new_z) {
		z = new_z;
	}

	/**
	 * Sets the sub chunk count
	 * @param {Number} new_sub_chunk_count
	 */
	setSubChunkCount(new_sub_chunk_count) {
		sub_chunk_count = new_sub_chunk_count;
	}

	/**
	 * Sets if the cache is enabled
	 * @param {Boolean} new_cache_enabled
	 */
	setCacheEnabled(new_cache_enabled) {
		cache_enabled = new_cache_enabled;
	}

	/**
	 * Sets the chunk payload
	 * @param {JSON} new_payload
	 */
	setPayload(new_payload) {
		payload = new_payload;
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
	 * Returns if the cache is enabled
	 * @returns {Boolean}
	 */
	getCacheEnabled() {
		return cache_enabled;
	}

	/**
	 * Returns the payload
	 * @returns {JSON}
	 */
	getPayload() {
		return payload;
	}

	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			x: this.getX(),
			z: this.getZ(),
			sub_chunk_count: this.getSubChunkCount(),
			cache_enabled: this.getCacheEnabled(),
			payload: { type: "Buffer", data: this.getPayload() },
		});
	}
}

module.exports = ServerLevelChunkPacket;
