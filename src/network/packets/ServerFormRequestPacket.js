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
const FormTypes = require("../../forms/FormTypes");

const PacketConstructor = require('./PacketConstructor')

let id = 0;
let content = "";
let buttons = null;
let title = "";
let type = FormTypes.FORM;
let button1 = "";
let button2 = "";

class ServerFormRequestPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "modal_form_request";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}

	/**
	 * Sets the ID for the form
	 * @param {Number} new_id
	 */
	setId(new_id) {
		id = new_id;
	}

	/**
	 * Sets the content of the form
	 * @param {JSON} new_content 
	 */
	setContent(new_content) {
		content = new_content;
	}

	/**
	 * Sets the buttons of the form
	 * @param {JSON} new_buttons 
	 */
	setButtons(new_buttons) {
		buttons = new_buttons;
	}

	/**
	 * Sets the title of the form
	 * @param {String} new_title - The new title
	 */
	setTitle(new_title) {
		title = new_title;
	}

	/**
	 * Sets the type of the form.
	 * @param {FormTypes} new_type - The type of the form.
	 */
	setType(new_type) {
		type = new_type;
	}

	/**
	 * Sets the button1 of the form (requires modal form)
	 * @param {JSON} new_button1 
	 */
	setButton1(new_button1) {
		button1 = new_button1;
	}

	/**
	 * Sets the button2 of the form (requires modal form)
	 * @param {JSON} new_button2 
	 */
	setButton2(new_button2) {
		button2 = new_button2;
	}

	/**
	 * Sets the text of the form
	 * @param {String} new_text 
	 */
	setText(new_text) {
		content = new_text;
	}

	/**
	 * Returns the form text
	 * @returns {String} - The form text
	 */
	getText() {
		return content;
	}

	/**
	 * Returns the ID of the form
	 * @returns {Number} - The ID of the form
	 */
	getId() {
		return id;
	}

	/**
	 * Returns the content of the form
	 * @returns {String} - The content of the form
	 */
	getContent() {
		return content;
	}

	/**
	 * Returns the button list
	 * @returns {JSON} - The button list
	 */
	getButtons() {
		return buttons;
	}

	/**
	 * Returns the form title
	 * @returns {String} - The title
	 */
	getTitle() {
		return title;
	}

	/**
	 * Returns the form type
	 * @returns {FormTypes} - The form types
	 */
	getType() {
		return type;
	}

	/**
	 * Returns the button1 of the form (requires modal form)
	 * @returns {JSON} - The button1
	 */
	getButton1() {
		return button1;
	}

	/**
	 * Returns the button2 of the form (requires modal form)
	 * @returns {JSON} - The button2
	 */
	getButton2() {
		return button2;
	}

	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client) {
		if (type === FormTypes.MODALFORM) {
			client.queue(this.getPacketName(), {
				form_id: this.getId(),
				data: `{"content":"${this.getText()}","button1":"${this.getButton1()}","button2":"${this.getButton2()}","type":"${this.getType()}","title":"${this.getTitle()}"}`,
			});
			return
		}

		client.queue(this.getPacketName(), {
			form_id: this.getId(),
			data: `{"content":${this.getContent()},"buttons":${this.getButtons()},"type":"${this.getType()}","title":"${this.getTitle()}"}`
		});
	}
}

module.exports = ServerFormRequestPacket;
