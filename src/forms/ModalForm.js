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

const Form = require("./types/Form");

class ModalForm {
	constructor() {
		/**
		 * @type {string}
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
		 * @param {import("Frog").Player} client
		 */
		this.onSend = (form, client) => {};
	}

	/**
	 * Sends the form to the player.
	 *
	 * @param {import("Frog").Player} player
	 */
	send(player) {
		this.onSend(this, player);

		const formRequestPacket = new ServerFormRequestPacket();
		formRequestPacket.type = Form.MODAL_FORM;
		formRequestPacket.id = this.id;
		formRequestPacket.title = this.title;
		formRequestPacket.content = this.text;
		formRequestPacket.button1 = this.button1;
		formRequestPacket.button2 = this.button2;
		formRequestPacket.writePacket(player);
	}
}

module.exports = ModalForm;
