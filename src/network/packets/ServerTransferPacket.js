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

class ServerTransferPacket extends PacketConstructor {
	/**
	 * Returns the name of the packet.
	 * @returns {String} The name of the packet.
	 */
	getPacketName() {	
		return "transfer";
	}

	/**
	 * Returns whether the packet is critical or not.
	 * @returns {Boolean} Returns true if the packet is critical, false otherwise.
	 */
	isCriticalPacket() {
		return false
	}
	
	/**
	 * Sets the server address
	 * @param {String} address
	 */
	setServerAddress(address) {
		server_address = address;
	}

	/**
	 * Sets the server port
	 * @param {Number} new_port
	 */
	setPort(new_port) {
		port = new_port;
	}

	/**
	 * Returns the server address.
	 * @returns {String}
	 */
	getServerAddress() {
		return server_address;
	}

	/**
	 * Returns the server port.
	 * @returns {Number}
	 */
	getPort() {
		return port;
	}

	/**
	 * Sends the packet to the client
	 * @param {any} client
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
