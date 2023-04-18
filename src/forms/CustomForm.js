/* eslint-disable no-unused-vars */
const ServerFormRequestPacket = require("../network/packets/ServerFormRequestPacket");
const FormTypes = require("./FormTypes");

class CustomForm {
	constructor() {
		/**
		 * @type {FormTypes}
		 * 
		 * @type {import("./FormTypes")}
		 */
		this.type = FormTypes.CUSTOMFORM;

		/**
		 * @type {function}
		 * @param {ModalForm} form
		 * @param {Client} client
		 * @returns {void}
		 */
		this.onSend = (form, client) => { }

		/**
		 * @type {string}
		 */
		this.title = "";

		/**
		 * @type {Array.<{ type: string, text: string, [placeholder]: string, [options]: JSON, [min]: number, [max]: number, [step]: number }>}
		 */
		this.actions = [];

		/**
		 * @type {Array.<{ text: string, image?: { type: string, data: string } }>}
		 */
		this.buttons = [];

		/**
		 * @type {number}
		 */
		this.id = 0;
	}

	/**
	 * Add an action to the form.
	 * 
	 * @param {object} action - The action to add to the list of actions.
	 * @param {string} action.type - The type of action, e.g. "input", "label", "dropdown", "toggle", or "slider".
	 * @param {string} action.text - The text to display for the action.
	 * @param {string} [action.placeholder] - The text to display as a placeholder in an input field.
	 * @param {JSON} [action.options] - An object containing key-value pairs that define the options for a dropdown menu.
	 * @param {number} [action.min] - The minimum value for a slider.
	 * @param {number} [action.max] - The maximum value for a slider.
	 * @param {number} [action.step] - The step value for a slider.
	 */
	addAction(action) {
		this.actions.push(action);
	}

	/**
	 * Add an input to the form.
	 * 
	 * @param {string} text - The text that will be displayed in the input field.
	 * @param {string} [placeholder] - The text that will be displayed in the input box before the user types anything.
	 */
	addInput(text, placeholder = "") {
		this.addAction({ type: "input", text: text, placeholder: placeholder });
	}

	/**
	 * Add a label to the form.
	 * 
	 * @param {string} text - The text to display.
	 */
	addLabel(text) {
		this.addAction({ type: "label", text: text });
	}

	/**
	 * Add a dropdown menu to the form.
	 * 
	 * @param {string} text - The text to display for the dropdown.
	 * @param {JSON} options - An object containing key-value pairs that define the options for the dropdown.
	 */
	addDropdown(text, options) {
		this.addAction({ type: "dropdown", text: text, options: options });
	}

	/**
	 * Add a toggle button to the form.
	 * 
	 * @param {string} text - The text to display for the toggle.
	 */
	addToggle(text) {
		this.addAction({ type: "toggle", text: text });
	}

	/**
	 * Add a slider to the form.
	 * 
	 * @param {string} text - The text to display for the slider.
	 * @param {number} min - The minimum value for the slider.
	 */
	addSlider(text, min, max, step = -1) {
		this.addAction({ type: "slider", text: text, min: min, max: max, step: step });
	}

	/**
	 * Sends the custom form to a player.
	 * 
	 * @param {Client} client
	 */
	send(client) {
		const packet = new ServerFormRequestPacket();
		packet.setId(this.id);
		packet.setTitle(this.title);
		packet.setContent(JSON.stringify(this.actions));
		packet.setButtons(JSON.stringify(this.buttons));
		packet.setType(this.type);
		packet.send(client);

		this.onSend(this, client)
	}
}

module.exports = CustomForm;