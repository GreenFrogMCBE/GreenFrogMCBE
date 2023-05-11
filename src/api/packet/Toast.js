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
const Frog = require("../../Frog");

const ServerToastRequestPacket = require("../network/packets/ServerToastRequestPacket");

class Toast {
	constructor() {
		/** @type {string} */
		this.title;
		/** @type {string} */
		this.message;
	}

	/**
	 * Sets the title.
	 * @param {string} title
	 */
	setTitle(title) {
		this.title = title;
	}

	/**
	 * Sets the message.
	 * @param {string} message
	 */
	setMessage(message) {
		this.message = message;
	}

	/**
	 * Sends the toast
	 * @param {Client} player
	 */
	send(player) {
		Frog.eventEmitter.emit("serverToast", {
			server: require("../../Server"),
			title: this.title,
			message: this.message,
			player: player,
		});

		const toast = new ServerToastRequestPacket();
		toast.setMessage(this.message);
		toast.setTitle(this.title);
		toast.execute(player);
	}
}

module.exports = Toast;
