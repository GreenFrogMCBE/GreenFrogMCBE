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
const FormRequest = require("../../network/packets/FormRequest");
const Colors = require("../../player/Colors");
const FormTypes = require("./FormTypes");

class Form {
	constructor() {
		this.type = FormTypes.FORM;
		this.title = Colors.red + "Invalid title!";
		this.buttons = [];
		this.id = 0;
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
	}
}

module.exports = Form;
