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
let window_id = null;
let input = [];

const PacketConstructor = require("./PacketConstructor");

class ServerInventoryContentPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "inventory_content";
	}

	/**
	 * Sets the window ID.
	 * @param {number} ID
	 */
	setWindowId(new_id) {
		window_id = new_id;
	}

	/**
	 * Sets the item data.
	 * @param {JSON} new_input
	 */
	setInput(new_input) {
		input = new_input;
	}

	/**
	 * Returns the window ID.
	 * @returns {number} The window ID.
	 */
	getWindowId() {
		return window_id;
	}

	/**
	 * Returns the item data.
	 * @returns {JSON} The item data.
	 */
	getInput() {
		return input;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			window_id: this.getWindowId(),
			input: this.getInput(),
		});
	}
}

module.exports = ServerInventoryContentPacket;
