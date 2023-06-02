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
const PacketConstructor = require("./PacketConstructor");

let server_address;
let port = 0;

class ServerTransferPacket extends PacketConstructor {
	/**
	 * Returns the name of the packet.
	 * @returns {string}.
	 */
	getPacketName() {
		return "transfer";
	}

	/**
	 * Sets the server address
	 * @param {string} address
	 */
	setServerAddress(address) {
		server_address = address;
	}

	/**
	 * Sets the server port
	 * @param {number} new_port
	 */
	setPort(new_port) {
		port = new_port;
	}

	/**
	 * Returns the server address.
	 * @returns {string}
	 */
	getServerAddress() {
		return server_address;
	}

	/**
	 * Returns the server port.
	 * @returns {number}
	 */
	getPort() {
		return port;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		this.validate(this.getServerAddress(), this.getPort());

		client.queue(this.getPacketName(), {
			server_address: this.getServerAddress(),
			port: parseInt(this.getPort()),
		});
	}
}

module.exports = ServerTransferPacket;
