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

class Form {
	constructor() {
		/**
		 * The title of the form.
		 * @type {string}
		 */
		this.title = ""

		/**
		 * The buttons in the form.
		 * @type {import("Frog").FormButton[]}
		 */
		this.buttons = []

		/**
		 * @type {function}
		 *
		 * @param {Form} form
		 * @param {import("Frog").Player} client
		 */
		// eslint-disable-next-line no-unused-vars
		this.on_send = (form, client) => { }

		/**
		 * The ID of the form.
		 * @type {number}
		 */
		this.id = 0

		/**
		 * The text in the form.
		 * @type {string}
		 */
		this.content
	}

	/**
	 * Sends the form to the player.
	 *
	 * @param {import("Frog").Player} player
	 */
	send(player) {
		const form_request_packet = new ServerFormRequestPacket()
		form_request_packet.id = this.id
		form_request_packet.title = this.title
		form_request_packet.content = this.content
		form_request_packet.buttons = this.buttons
		form_request_packet.type = FormVariant.Default
		form_request_packet.write_packet(player)

		this.on_send(this, player)
	}
}

module.exports = Form
