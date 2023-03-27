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
export = ServerFormRequestPacket;
declare class ServerFormRequestPacket extends PacketConstructor {
	/**
	 * Sets the ID for the form
	 * @param {Number} new_id
	 */
	setId(new_id: number): void;
	/**
	 * Sets the content of the form
	 * @param {JSON} new_content
	 */
	setContent(new_content: JSON): void;
	/**
	 * Sets the buttons of the form
	 * @param {JSON} new_buttons
	 */
	setButtons(new_buttons: JSON): void;
	/**
	 * Sets the title of the form
	 * @param {String} new_title - The new title
	 */
	setTitle(new_title: string): void;
	/**
	 * Sets the type of the form.
	 * @param {FormTypes} new_type - The type of the form.
	 */
	setType(new_type: typeof FormTypes): void;
	/**
	 * Sets the button1 of the form (requires modal form)
	 * @param {JSON} new_button1
	 */
	setButton1(new_button1: JSON): void;
	/**
	 * Sets the button2 of the form (requires modal form)
	 * @param {JSON} new_button2
	 */
	setButton2(new_button2: JSON): void;
	/**
	 * Sets the text of the form
	 * @param {String} new_text
	 */
	setText(new_text: string): void;
	/**
	 * Returns the form text
	 * @returns {String} - The form text
	 */
	getText(): string;
	/**
	 * Returns the ID of the form
	 * @returns {Number} - The ID of the form
	 */
	getId(): number;
	/**
	 * Returns the content of the form
	 * @returns {String} - The content of the form
	 */
	getContent(): string;
	/**
	 * Returns the button list
	 * @returns {JSON} - The button list
	 */
	getButtons(): JSON;
	/**
	 * Returns the form title
	 * @returns {String} - The title
	 */
	getTitle(): string;
	/**
	 * Returns the form type
	 * @returns {FormTypes} - The form types
	 */
	getType(): typeof FormTypes;
	/**
	 * Returns the button1 of the form (requires modal form)
	 * @returns {JSON} - The button1
	 */
	getButton1(): JSON;
	/**
	 * Returns the button2 of the form (requires modal form)
	 * @returns {JSON} - The button2
	 */
	getButton2(): JSON;
	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
import FormTypes = require("../../forms/FormTypes");
