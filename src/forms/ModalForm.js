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
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const ServerFormRequestPacket = require("../network/packets/ServerFormRequestPacket");
const FormTypess = require("./types/FormTypes");

class ModalForm {
	constructor() {
		/**
		 * @type {FormTypess}
		 *
		 * @type {import("./types/FormTypes")}
		 */
		this.title = "";

		/**
		 * @type {string}
		 */
		this.text = "";

		/**
		 * @type {string}
		 */
		this.button1 = "";

		/**
		 * @type {string}
		 */
		this.button2 = "";

		/**
		 * @type {number}
		 */
		this.id = 0;

		/**
		 * @type {function}
		 *
		 * @param {ModalForm} form
		 * @param {Client} client
		 */
		this.onSend = () => {};
	}

	/**
	 * Sends the modal form to the specified client.
	 *
	 * @param {Client} client
	 */
	send(client) {
		this.onSend(this, client);

		const FormRequestPacket = new ServerFormRequestPacket();
		FormRequestPacket.type = FormTypess.MODAL_FORM;
		FormRequestPacket.id = this.id;
		FormRequestPacket.title = this.title;
		FormRequestPacket.content = this.text;
		FormRequestPacket.button1 = this.button1;
		FormRequestPacket.button2 = this.button2;
		FormRequestPacket.writePacket(client);
	}
}

module.exports = ModalForm;
