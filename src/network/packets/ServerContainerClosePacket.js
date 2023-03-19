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
 	 * @returns The name of the packet
 	*/
	getPacketName() {
		return "container_close";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}

	/**
	 * It sets the window id
	 * @param {Number} id
	 */
	setWindowId(id) {
		window_id = id;
	}

	/**
	 * It sets the if the request is coming from server
	 * @param {Boolean} server1
	 */
	setServer(server1) {
		server = server1;
	}

	/**
	 * It returns the window ID
	 * @returns {Number} The window ID
	 */
	getWindowId() {
		return window_id;
	}

	/**
	 * It returns the if request is coming from server
	 * @returns {Number}
	 */
	getServer() {
		return server;
	}

	writePacket(client) {
		client.queue(this.getPacketName(), {
			window_id: this.getWindowId(),
			server: this.getServer(),
		});
	}
}

module.exports = ServerContainerClosePacket;
