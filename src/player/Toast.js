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
		let should_send_toast = true

		Frog.event_emitter.emit("serverToast", {
			player,
			title: this.title,
			message: this.message,
			cancel() {
				should_send_toast = false
			},
		})

		if (!should_send_toast) return

		const toast_request = new ServerToastRequestPacket()
		toast_request.message = this.message
		toast_request.title = this.title
		toast_request.write_packet(player)
	}
}

module.exports = Toast
