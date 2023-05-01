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
let status;

const PacketConstructor = require("./PacketConstructor");

class ServerPlayStatusPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "play_status";
	}

	/**
	 * Returns if the packet is critical?
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return true;
	}

	/**
	 * Sets the status.
	 * @param new_status
	 */
	setStatus(new_status) {
		status = new_status;
	}

	/**
	 * Returns the status.
	 * @returns {string} The status
	 */
	getStatus() {
		return status;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			status: this.getStatus(),
		});
	}
}

module.exports = ServerPlayStatusPacket;
