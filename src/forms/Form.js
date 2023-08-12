/* eslint-disable no-unused-vars */
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

const FormType = require("./types/FormType");

class Form {
	constructor() {
		/**
		 * @type {FormType | string}
		*/
		this.type = FormType.FORM;

		/**
		 * The title of the form.
		 * @type {string}
		 */
		this.title = "";

		/**
		 * The buttons in the form.
		 * @type {Array}
		 */
		this.buttons = [];

		/**
		 * @type {function}
		 *
		 * @param {Form} form
		 * @param {import('frog-protocol').Client} client
		 */
		this.onSend = (form, client) => {};

		/**
		 * The ID of the form.
		 * @type {number}
		 */
		this.id = 0;

		/**
		 * The text in the form.
		 * @type {string | Array}
		 */
		this.text = [];
	}

	/**
	 * @param {import('frog-protocol').Client} client
	 */
	send(client) {
		const FormReq = new ServerFormRequestPacket();
		FormReq.id = this.id;
		FormReq.title = this.title;
		FormReq.text = this.text;
		FormReq.buttons = JSON.stringify(this.buttons);
		FormReq.type = this.type;
		FormReq.writePacket(client);

		this.onSend(this, client);
	}
}

module.exports = Form;
