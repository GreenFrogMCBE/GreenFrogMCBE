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
export = CustomForm;
declare class CustomForm {
	type: string;
	title: string;
	buttons: {};
	id: number;
	actions: {};
	/**
	 * Add an action.
	 * @param action - The action to add to the list of actions.
	 */
	addAction(action: any): void;
	/**
	 * Adds an input to the form.
	 * @param text - The text that will be displayed in the input field.
	 * @param [placeholder] - The text that will be displayed in the input box before the user types
	 * anything.
	 */
	addInput(text: any, placeholder?: string): void;
	/**
	 * It adds a label to the form
	 * @param text - The text to display.
	 */
	addText(text: any): void;
	/**
	 * Adds a dropdown to the form.
	 * @param {String} text
	 * @param {JSON} options
	 */
	addDropdown(text: string, options: JSON): void;
	/**
	 * Adds toggle button
	 * @param {String} text
	 */
	addToggle(text: string): void;
	/**
	 * Adds slider to the form.
	 * @param {String} text
	 * @param {Number} min
	 * @param {Number} max
	 * @param {Number} step
	 */
	addSlider(text: string, min: number, max: number, step?: number): void;
	/**
	 * Sends the form to the client
	 * @param {Object} client
	 */
	send(client: any): void;
}
