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

class ModalForm {
	constructor() {
		this.title = "Invalid title!";
		this.text = "Invalid text!";
		this.button1 = "Invalid button1!";
		this.button2 = "Invalid button2!";
		this.id = 0;
	}

	send(client) {
		const FormReq = new FormRequest();
		FormReq.setType(FormTypes.MODALFORM);
		FormReq.setId(this.id);
		FormReq.setTitle(this.title);
		FormReq.setContent(this.text);
		FormReq.setButton1(this.button1);
		FormReq.setButton2(this.button2);
		FormReq.send(client);
	}
}

module.exports = ModalForm;
