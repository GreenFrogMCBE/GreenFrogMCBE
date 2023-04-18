/* eslint-disable no-unused-vars */
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
const FormRequest = require("../network/packets/ServerFormRequestPacket");
const FormTypes = require("./FormTypes");

class Form {
	constructor() {
		/**
		 * @type {FormTypes}
		 * 
		 * @type {import("./FormTypes")}
		 */
		this.type = FormTypes.FORM;

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
		 * @param {Client} client
		 */
		this.onSend = (form, client) => { }

		/**
		 * The ID of the form.
		 * @type {number}
		 */
		this.id = 0;

		/**
		 * The text in the form.
		 * @type {Array}
		 */
		this.text = [];
	}

	send(client) {
		const FormReq = new FormRequest();
		FormReq.setId(this.id);
		FormReq.setTitle(this.title);
		FormReq.setContent(this.text);
		FormReq.setButtons(JSON.stringify(this.buttons));
		FormReq.setType(this.type);
		FormReq.send(client);

		this.onSend(this, client)
	}
}

module.exports = Form;
