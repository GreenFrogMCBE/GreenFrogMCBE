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
let window_id = 0;
let server = false;

const PacketConstructor = require("./PacketConstructor");

class ServerContainerClosePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "container_close";
	}

	/**
	 * Returns if the packet is critical?
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the window ID
	 * @param {number} new_id
	 */
	setWindowID(new_id) {
		window_id = new_id;
	}

	/**
	 * Sets if the request is coming from server
	 * @param {boolean} new_server
	 */
	setServer(new_server) {
		server = new_server;
	}

	/**
	 * It returns the window ID
	 * @returns {number} The window ID
	 */
	getWindowID() {
		return window_id;
	}

	/**
	 * Returns if request is coming from server
	 * @returns {boolean}
	 */
	getServer() {
		return server;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			window_id: this.getWindowID(),
			server: this.getServer(),
		});
	}
}

module.exports = ServerContainerClosePacket;
