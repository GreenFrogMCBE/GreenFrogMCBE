/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
/* eslint-disable no-unused-vars */
const ServerFormRequestPacket = require("../network/packets/ServerFormRequestPacket");
const FormTypes = require("./FormTypes");

class ModalForm {
	constructor() {
		/**
		 * @type {FormTypes}
		 *
		 * @type {import("./FormTypes")}
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
		this.onSend = (form, client) => {};
	}

	/**
	 * Sends the modal form to the specified client.
	 *
	 * @param {Client} client
	 */
	send(client) {
		const FormReq = new ServerFormRequestPacket();
		FormReq.setType(FormTypes.MODALFORM);
		FormReq.setID(this.id);
		FormReq.setTitle(this.title);
		FormReq.setContent(this.text);
		FormReq.setButton1(this.button1);
		FormReq.setButton2(this.button2);
		FormReq.send(client);

		this.onSend(this, client);
	}
}

module.exports = ModalForm;
