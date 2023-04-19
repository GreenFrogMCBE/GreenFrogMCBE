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
let enabled = false;

const PacketConstructor = require("./PacketConstructor");

class ServerClientCacheStatusPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	name() {
		return "client_cache_status";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets if the caching is enabled?
	 * @param {boolean} new_enabled - Caching enabled?
	 */
	setEnabled(new_enabled) {
		enabled = new_enabled;
	}

	/**
	 * Returns if the caching is enabled
	 * @returns {boolean} If the caching is enabled.
	 */
	getEnabled() {
		return enabled;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			enabled: this.getEnabled(client),
		});
	}
}

module.exports = ServerClientCacheStatusPacket;
