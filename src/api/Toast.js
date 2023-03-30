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
const ServerToastRequestEvent = require("../events/ServerToastRequestEvent");

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
		const toastRequestEvent = new ServerToastRequestEvent();
		toastRequestEvent.message = this.message
		toastRequestEvent.title = this.title;
		toastRequestEvent.player = player
		toastRequestEvent.execute();
	}
}

module.exports = Toast;
