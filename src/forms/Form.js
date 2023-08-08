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
/* eslint-disable no-unused-vars */
const ServerFormRequestPacket = require("../network/packets/ServerFormRequestPacket");

const FormVariant = require("./types/Form");

class Form {
	constructor() {
		/**
		 * The title of the form.
		 * @type {string}
		 */
		this.title = "";

		/**
		 * The buttons in the form.
		 * @type {import("Frog").FormButton[]}
		 */
		this.buttons = [];

		/**
		 * @type {function}
		 *
		 * @param {Form} form
		 * @param {import("Frog").Player} client
		 */
		this.onSend = (form, client) => {};

		/**
		 * The ID of the form.
		 * @type {number}
		 */
		this.id = 0;

		/**
		 * The text in the form.
		 * @type {string}
		 */
		this.content;
	}

	/**
	 * @param {import("Frog").Player} player
	 */
	send(player) {
		const formRequest = new ServerFormRequestPacket();
		formRequest.id = this.id;
		formRequest.title = this.title;
		formRequest.content = this.content;
		formRequest.buttons = JSON.stringify(this.buttons);
		formRequest.type = FormVariant.FORM;
		formRequest.writePacket(player);

		this.onSend(this, player);
	}
}

module.exports = Form;
