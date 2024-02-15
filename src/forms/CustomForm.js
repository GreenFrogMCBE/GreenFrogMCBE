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

const { Action, FormType } = require("@greenfrog/mc-enums")

class CustomForm {
	constructor() {
		/**
		 * @type {string}
		 */
		this.title = ""

		/**
		 * @type {import("Frog").FormAction[]}
		 */
		this.actions = []

		/**
		 * @type {import("Frog").FormButton[]}
		 */
		this.buttons = []

		/**
		 * @type {number}
		 */
		this.id = 0

		/**
		 * @type {function}
		 */
		this.on_send = () => { }
	}

	/**
	 * Adds an action to the form.
	 *
	 * @param {import("Frog").FormAction} action
	 */
	add_action(action) {
		this.actions.push(action)
	}

	/**
	 * Adds an input to the form.
	 *
	 * @param {string} text
	 * @param {string} [placeholder]
	 */
	add_input(text, placeholder = "") {
		this.add_action({ type: Action.Input, text, placeholder })
	}

	/**
	 * Adds a label to the form.
	 *
	 * @param {string} text
	 */
	add_text(text) {
		this.add_action({ type: Action.Label, text })
	}

	/**
	 * Adds a dropdown menu to the form.
	 *
	 * @param {string} text
	 * @param {string[]} options
	 */
	add_dropdown(text, options) {
		this.add_action({ type: Action.Dropdown, text, options })
	}

	/**
	 * Adds a toggle button to the form.
	 *
	 * @param {string} text
	 */
	add_toggle(text) {
		this.add_action({ type: Action.Toggle, text })
	}

	/**
	 * Adds a slider to the form.
	 *
	 * @param {string} text
	 * @param {number} min
	 * @param {number} max
	 * @param {number} [step]
	 */
	add_slider(text, min, max, step = -1) {
		this.add_action({ type: Action.Slider, text, min, max, step })
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
		form_request_packet.content = this.actions
		form_request_packet.buttons = this.buttons
		form_request_packet.type = FormType.Custom
		form_request_packet.write_packet(player)

		this.on_send(this, player)
	}
}

module.exports = CustomForm
