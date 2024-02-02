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
const Form = require("../../forms/types/Form")

const Packet = require("./Packet")

class ServerFormRequestPacket extends Packet {
	name = "modal_form_request"

	/** @type {number | undefined} */
	id
	/** @type {string | undefined} */
	content
	/** @type {string | undefined} */
	buttons
	/** @type {string | undefined} */
	title
	/** @type {import("Frog").Form | undefined} */
	type
	/** @type {string[] | undefined} */
	text
	/** @type {string | undefined} */
	button1
	/** @type {string | undefined} */
	button2

	/**
	 * @param {import("Frog").Player} player
	 */
	write_packet(player) {
		let data

		if (this.type === Form.MODAL_FORM) {
			data = {
				content: this.content,
				button1: this.button1,
				button2: this.button2,
				title: this.title,
				type: this.type,
			}
		} else {
			data = {
				content: this.content,
				buttons: this.buttons,
				title: this.title,
				type: this.type,
			}
		}

		player.queue(this.name, {
			form_id: this.id,
			data: JSON.stringify(data),
		})
	}
}

module.exports = ServerFormRequestPacket
