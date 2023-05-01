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
let x = 0;
let z = 0;
let sub_chunk_count = 0;
let cache_enabled = false;
let payload = [];

const PacketConstructor = require("./PacketConstructor");

class ServerLevelChunkPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "level_chunk";
	}

	/**
	 * Returns if the packet is critical?
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
		x = new_x;
	}

	/**
	 * Sets the Z coordinate
	 * @param {number} new_z
	 */
	setZ(new_z) {
		z = new_z;
	}

	/**
	 * Sets the sub chunk count
	 * @param {number} new_sub_chunk_count
	 */
	setSubChunkCount(new_sub_chunk_count) {
		sub_chunk_count = new_sub_chunk_count;
	}

	/**
	 * Sets if the cache is enabled
	 * @param {boolean} new_cache_enabled
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
	 * @returns {number}
	 */
	getX() {
		return x;
	}

	/**
	 * It gets the Z coordinate
	 * @returns {number}
	 */
	getZ() {
		return z;
	}

	/**
	 * It gets the sub chunk count
	 * @returns {number}
	 */
	getSubChunkCount() {
		return sub_chunk_count;
	}

	/**
	 * Returns if the cache is enabled
	 * @returns {boolean}
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
	 * @param {Client} client
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
