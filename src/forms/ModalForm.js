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
const ServerFormRequestPacket = require("../network/packets/ServerFormRequestPacket")

const { FormVariant } = require("@greenfrog/mc-enums")

class ModalForm {
	constructor() {
		/**
		 * @type {string}
		 */
		this.title = ""

		/**
		 * @type {string}
		 */
		this.text = ""

		/**
		 * @type {string}
		 */
		this.button1 = ""

		/**
		 * @type {string}
		 */
		this.button2 = ""

		/**
		 * @type {number}
		 */
		this.id = 0

		/**
		 * @type {function}
		 */
		this.on_send = () => {}
	}

	/**
	 * Sends the form to the player.
	 *
	 * @param {import("Frog").Player} player
	 */
	send(player) {
		this.on_send(this, player)

		const form_request_packet = new ServerFormRequestPacket()
		form_request_packet.type = FormVariant.Modal
		form_request_packet.id = this.id
		form_request_packet.title = this.title
		form_request_packet.content = this.text
		form_request_packet.button1 = this.button1
		form_request_packet.button2 = this.button2
		form_request_packet.write_packet(player)
	}
}

module.exports = ModalForm
