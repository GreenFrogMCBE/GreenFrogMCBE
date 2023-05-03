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

let title;
let message;

class ServerToastRequestPacket extends PacketConstructor {
	/**
	 * Returns the name of the packet.
	 * @returns {string}.
	 */
	getPacketName() {
		return "toast_request";
	}

	/**
	 * Returns whether the packet is critical or not.
	 * @returns {boolean} Returns true if the packet is critical, false otherwise.
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the title of the toast.
	 * @param new_title
	 */
	setTitle(new_title) {
		title = new_title;
	}

	/**
	 * Sets the message of the toast.
	 * @param new_messaged.
	 */
	setMessage(new_message) {
		message = new_message;
	}

	/**
	 * Returns the title.
	 * @returns {string}
	 */
	getTitle() {
		return title;
	}

	/**
	 * Returns the message.
	 * @returns {string}
	 */
	getMessage() {
		return message;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	send(client) {
		client.queue(this.getPacketName(), {
			title: this.getTitle(),
			message: this.getMessage(),
		});
	}
}

module.exports = ServerToastRequestPacket;
