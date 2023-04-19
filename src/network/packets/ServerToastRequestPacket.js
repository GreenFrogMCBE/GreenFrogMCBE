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

let title;
let message;

class ServerToastRequestPacket extends PacketConstructor {
	/**
	 * Returns the name of the packet.
	 * @returns {string} The name of the packet.
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
