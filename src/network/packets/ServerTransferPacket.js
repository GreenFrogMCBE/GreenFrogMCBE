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
const PacketConstructor = require("./PacketConstructor");

let server_address;
let port = 0;

class ServerTransferPacket extends PacketConstructor {
	/**
	 * Returns the name of the packet.
	 * @returns {string} The name of the packet.
	 */
	getPacketName() {
		return "transfer";
	}

	/**
	 * Returns whether the packet is critical or not.
	 * @returns {boolean} Returns true if the packet is critical, false otherwise.
	 */
	isCriticalPacket() {
		return false;
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
