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
const ServerFormRequestPacket = require("../network/packets/ServerFormRequestPacket");

const Action = require("./types/Action");
const Form = require("./types/Form");

class CustomForm {
	constructor() {
		/**
		 * @type {function}
		 */
		this.onSend = () => {};

		/**
		 * @type {string}
		 */
		this.title = "";

		/**
		 * @type {import("Frog").FormAction[]}
		 */
		this.actions = [];

		/**
		 * @type {import("Frog").FormButton[]}
		 */
		this.buttons = [];

		/**
		 * @type {number}
		 */
		this.id = 0;
	}

	/**
	 * Adds an action to the form.
	 *
	 * @param {import("Frog").FormAction} action
	 */
	addAction(action) {
		this.actions.push(action);
	}

	/**
	 * Adds an input to the form.
	 *
	 * @param {string} text
	 * @param {string} [placeholder]
	 */
	addInput(text, placeholder = "") {
		this.addAction({ type: Action.INPUT, text, placeholder });
	}

	/**
	 * Adds a label to the form.
	 *
	 * @param {string} text
	 */
	addText(text) {
		this.addAction({ type: Action.LABEL, text });
	}

	/**
	 * Adds a dropdown menu to the form.
	 *
	 * @param {string} text
	 * @param {string[]} options
	 */
	addDropdown(text, options) {
		this.addAction({ type: Action.DROPDOWN, text, options });
	}

	/**
	 * Adds a toggle button to the form.
	 *
	 * @param {string} text
	 */
	addToggle(text) {
		this.addAction({ type: Action.TOGGLE, text });
	}

	/**
	 * Adds a slider to the form.
	 *
	 * @param {string} text
	 * @param {number} min
	 * @param {number} max
	 * @param {number} [step]
	 */
	addSlider(text, min, max, step = -1) {
		this.addAction({ type: Action.SLIDER, text, min, max, step });
	}

	/**
	 * Sends the form to the player.
	 *
	 * @param {import("Frog").Player} player
	 */
	send(player) {
		const formRequestPacket = new ServerFormRequestPacket();
		formRequestPacket.id = this.id;
		formRequestPacket.title = this.title;
		formRequestPacket.content = this.actions;
		formRequestPacket.buttons = this.buttons;
		formRequestPacket.type = Form.CUSTOM_FORM;
		formRequestPacket.writePacket(player);

		this.onSend(this, player);
	}
}

module.exports = CustomForm;
