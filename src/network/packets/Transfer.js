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

let server_address = null;
let port = null;

const { lang } = require("../../api/ServerInfo");

class Transfer extends require("./Packet") {
	/**
	 * @returns The name of the packet.
	 */
	name() {
		return "transfer";
	}

	/**
	 * @param {Object} client - The client to validate
	 * @param {string} address - The server address to validate
	 * @param {number} port - The server port to validate
	 */
	validate(address, port) {
		if (!address) throw new Error(lang.errors.targetServerNull);
		if (parseInt(port) == NaN)
			// isNaN will not work here
			throw new Error(lang.sendToInvalidServer);
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
	 * @param {Object} client - The client to send the packet to
	 */
	send(client) {
		this.validate(this.getServerAddress(), this.getPort());
		client.queue(this.name(), {
			server_address: this.getServerAddress(),
			port: parseInt(this.getPort()),
		});
	}
}

module.exports = Transfer;
