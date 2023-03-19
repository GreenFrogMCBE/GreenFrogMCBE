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
/* eslint-disable use-isnan */
/* eslint-disable no-dupe-class-members */
const PacketConstructor = require("./PacketConstructor");

let server_address = null;
let port = null;

const assert = require('assert')

class Transfer extends PacketConstructor {
	/**
	* Returns the packet name
	* @returns The name of the packet
	*/
	getPacketName() {
		return "transfer";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}
	
	/**
	 * @param {Object} client - The client to validate
	 * @param {string} address - The server address to validate
	 * @param {number} port - The server port to validate
	 */
	validate(address, port) {
		assert(address, null)
		assert(parseInt(port), NaN)
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
	 * @param {Number} port1
	 */
	setPort(port1) {
		port = port1;
	}

	/**
	 * It returns the server address.
	 * @returns The server address.
	 */
	getServerAddress() {
		return server_address;
	}

	/**
	 * It returns the server port.
	 * @returns The server port.
	 */
	getPort() {
		return port;
	}

	/**
	 * @param {Object} client - The client to writePacket the packet to
	 */
	writePacket(client) {
		this.validate(this.getServerAddress(), this.getPort());
		client.queue(this.name(), {
			server_address: this.getServerAddress(),
			port: parseInt(this.getPort()),
		});
	}
}

module.exports = Transfer;
