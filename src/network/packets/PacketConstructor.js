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
const UnsupportedOperationException = require("../../utils/exceptions/UnsupportedOperationException");

class PacketConstructor {
	constructor() {}

	/**
	 * Returns the packet name
	 * 
	 * @returns {string} 
	 */
	getPacketName() {
		return "unknown_packet";
	}

	/**
	 * Returns if the packet is critical
	 * 
	 * @returns {Boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Validates the packet
	 */
	validatePacket() {}

	/**
	 * Writes the packet
	 */
	writePacket() {
		throw new UnsupportedOperationException("Can't write a client-side packet");
	}

	/**
	 * Reads the packet
	 */
	readPacket() {
		throw new UnsupportedOperationException("Can't read a server-side packet");
	}
}

module.exports = PacketConstructor;
