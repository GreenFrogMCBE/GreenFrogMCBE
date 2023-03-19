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
const FormTypes = require("../../player/forms/FormTypes");
const Colors = require("../../api/PlayerColors");

const PacketConstructor = require('./PacketConstructor')

let id = 0;
let content = Colors.red + "Invalid text!";
let buttons = null;
let title = Colors.red + "Invalid title!";
let type = "form";
let button1 = Colors.red + "Invalid button1!";
let button2 = Colors.red + "Invalid button2!";

class FormRequest extends PacketConstructor {
	/**
	* Returns the packet name
	* @returns The name of the packet
	*/
	getPacketName() {
		return "modal_form_request";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}

	/**
	 * Sets the ID for the form request
	 * @param {Number} id1 
	 */
	setId(id1) {
		id = id1;
	}

	// TODO: More docs

	setContent(content1) {
		content = content1;
	}

	setButtons(buttons1) {
		buttons = buttons1;
	}

	setTitle(title1) {
		title = title1;
	}

	setType(type1) {
		type = type1;
	}

	setButton1(_button1) {
		button1 = _button1;
	}

	setText(_text) {
		content = _text;
	}

	setButton2(_button2) {
		button2 = _button2;
	}

	getText() {
		return content;
	}

	getId() {
		return id;
	}

	getContent() {
		return content;
	}

	getButtons() {
		return buttons;
	}

	getTitle() {
		return title;
	}

	getType() {
		return type;
	}

	getButton1() {
		return button1;
	}

	getButton2() {
		return button2;
	}

	/**
	 * It writePackets the form to the player
	 * @param client - The client that you want to writePacket the packet to.
	 */
	writePacket(client) {
		if (type === FormTypes.MODALFORM) {
			client.queue(this.getPacketName(), {
				form_id: this.getId(),
				data: `{"content":"${this.getText()}","button1":"${this.getButton1()}","button2":"${this.getButton2()}","type":"${this.getType()}","title":"${this.getTitle()}"}`,
			});
		} else {
			client.queue(this.getPacketName(), {
				form_id: this.getId(),
				data: `{"content":${this.getContent()},"buttons":${this.getButtons()},"type":"${this.getType()}","title":"${this.getTitle()}"}`,
			});
		}
	}
}

module.exports = FormRequest;
