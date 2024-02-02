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
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Frog = require("../Frog")

const ServerToastRequestPacket = require("../network/packets/ServerToastRequestPacket")

class Toast {
	constructor() {
		/** @type {string} */
		this.title
		/** @type {string} */
		this.message
	}

	/**
	 * Sends the toast
	 *
	 * @param {import("Frog").Player} player
	 */
	send(player) {
		let shouldSendToast = true

		Frog.eventEmitter.emit("serverToast", {
			player,
			title: this.title,
			message: this.message,
			cancel() {
				shouldSendToast = false
			},
		})

		if (!shouldSendToast) return

		const toast = new ServerToastRequestPacket()
		toast.message = this.message
		toast.title = this.title
		toast.writePacket(player)
	}
}

module.exports = Toast
