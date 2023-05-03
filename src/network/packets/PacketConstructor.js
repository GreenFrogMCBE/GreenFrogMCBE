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
const { getKey } = require("../../utils/Language");

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
	 * @returns {boolean}
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
		throw new UnsupportedOperationException(getKey("network.packet.failed.clientSide"));
	}

	/**
	 * Reads the packet
	 */
	readPacket() {
		throw new UnsupportedOperationException(getKey("network.packet.failed.serverSide"));
	}
}

module.exports = PacketConstructor;
