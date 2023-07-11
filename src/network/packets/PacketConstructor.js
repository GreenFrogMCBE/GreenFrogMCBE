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
 * @link Github - https://github.com/kotinash/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const { getKey } = require("../../utils/Language");

const UnsupportedOperationException = require("../../utils/exceptions/UnsupportedOperationException");

class PacketConstructor {
	constructor() {}

	/** @type {string} */
	name;

	validatePacket() {}

	/**
	 * @param {import("frog-protocol").Client} player
	 */
	writePacket() {
		throw new UnsupportedOperationException(getKey("network.packet.failed.clientSide"));
	}

	/**
	 * @param {import("frog-protocol").Client} player
	 * @param {JSON} packet
	 * @param {import("frog-protocol").Server} server
	 */
	readPacket() {
		throw new UnsupportedOperationException(getKey("network.packet.failed.serverSide"));
	}
}

module.exports = PacketConstructor;
