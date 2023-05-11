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
	 * @param {number} new_id
	 */
	setID(new_id: number): void;
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
	 * @param {string} new_title - The new title
	 */
	setTitle(new_title: string): void;
	/**
	 * Sets the type of the form.
	 * @param {FormTypes} new_type - The type of the form.
	 */
	setType(new_type: { readonly FORM: "form"; readonly CUSTOMFORM: "custom_form"; readonly MODALFORM: "modal" }): void;
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
	 * @param {string} new_text
	 */
	setText(new_text: string): void;
	/**
	 * Returns the form text
	 * @returns {string} - The form text
	 */
	getText(): string;
	/**
	 * Returns the ID of the form
	 * @returns {number} - The ID of the form
	 */
	getID(): number;
	/**
	 * Returns the content of the form
	 * @returns {string} - The content of the form
	 */
	getContent(): string;
	/**
	 * Returns the button list
	 * @returns {JSON} - The button list
	 */
	getButtons(): JSON;
	/**
	 * Returns the form title
	 * @returns {string} - The title
	 */
	getTitle(): string;
	/**
	 * Returns the form type
	 * @returns {FormTypes} - The form types
	 */
	getType(): {
		readonly FORM: "form";
		readonly CUSTOMFORM: "custom_form";
		readonly MODALFORM: "modal";
	};
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
	 * @param {Client} client
	 */
	writePacket(client: Client): void;
}
import PacketConstructor = require("./PacketConstructor");
