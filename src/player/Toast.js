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
	constructor(title, message) {
		this.title = title
		this.message = message
	}

	/**
	 * Sends the toast
	 *
	 * @param {import("Frog").Player} player
	 */
	send(player) {
		let shouldSendToast = true

		Frog.event_emitter.emit("serverToast", {
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
		toast.write_packet(player)
	}
}

module.exports = Toast
