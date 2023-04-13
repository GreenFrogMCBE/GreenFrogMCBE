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
const ServerToastRequestPacket = require("../network/packets/ServerToastRequestPacket");
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

class Toast {
	constructor() {
		this.title = null;
		this.message = null;
	}

	/**
	 * Sets the title.
	 * @param {String} title
	 */
	setTitle(title) {
		this.title = title;
	}

	/**
	 * Sets the message.
	 * @param {String} message
	 */
	setMessage(message) {
		this.message = message;
	}

	/**
	 * Sends the toast
	 * @param {any} client
	 */
	send(player) {
		eventEmitter.emit('', {
			server: require("../Server"),
			title: this.title,
			message: this.message,
			player: player
		})

		const toast = new ServerToastRequestPacket();
		toast.setMessage(this.message)
		toast.setTitle(this.title)
		toast.execute(player);
	}
}

module.exports = Toast;
