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
let window_id = 0;
let server = false;

const PacketConstructor = require('./PacketConstructor')

class ServerContainerClosePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "container_close";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}

	/**
	 * Sets the window ID
	 * @param {Number} new_id
	 */
	setWindowID(new_id) {
		window_id = new_id;
	}

	/**
	 * Sets if the request is coming from server
	 * @param {Boolean} new_server
	 */
	setServer(new_server) {
		server = new_server;
	}

	/**
	 * It returns the window ID
	 * @returns {Number} The window ID
	 */
	getWindowID() {
		return window_id;
	}

	/**
	 * Returns if request is coming from server
	 * @returns {Boolean} 
	 */
	getServer() {
		return server;
	}

	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			window_id: this.getWindowID(),
			server: this.getServer(),
		});
	}
}

module.exports = ServerContainerClosePacket;
