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
export = CustomForm;
declare class CustomForm {
	/**
	 * @type {FormTypes}
	 *
	 * @type {import("./FormTypes")}
	 */
	type: {
		readonly FORM: "form";
		readonly CUSTOMFORM: "custom_form";
		readonly MODALFORM: "modal";
	};
	/**
	 * @type {function}
	 *
	 * @param {CustomForm} form
	 * @param {Client} client
	 */
	onSend: Function;
	/**
	 * @type {string}
	 */
	title: string;
	/**
	 * @type {Array.<{ type: string, text: string, [placeholder]: string, [options]: JSON, [min]: number, [max]: number, [step]: number }>}
	 */
	actions: {
		type: string;
		text: string;
	}[];
	/**
	 * @type {Array.<{ text: string, image?: { type: string, data: string } }>}
	 */
	buttons: {
		text: string;
		image?: {
			type: string;
			data: string;
		};
	}[];
	/**
	 * @type {number}
	 */
	id: number;
	/**
	 * Add an action to the form.
	 *
	 * @param {object} action - The action to add to the list of actions.
	 * @param {string} action.type - The type of action, e.g. "input", "label", "dropdown", "toggle", or "slider".
	 * @param {string} action.text - The text to display for the action.
	 * @param {string} [action.placeholder] - The text to display as a placeholder in an input field.
	 * @param {JSON} [action.options] - An object containing key-value pairs that define the options for a dropdown menu.
	 * @param {number} [action.min] - The minimum value for a slider.
	 * @param {number} [action.max] - The maximum value for a slider.
	 * @param {number} [action.step] - The step value for a slider.
	 */
	addAction(action: { type: string; text: string; placeholder?: string; options?: JSON; min?: number; max?: number; step?: number }): void;
	/**
	 * Add an input to the form.
	 *
	 * @param {string} text - The text that will be displayed in the input field.
	 * @param {string} [placeholder] - The text that will be displayed in the input box before the user types anything.
	 */
	addInput(text: string, placeholder?: string): void;
	/**
	 * Add a label to the form.
	 *
	 * @param {string} text - The text to display.
	 */
	addLabel(text: string): void;
	/**
	 * Add a dropdown menu to the form.
	 *
	 * @param {string} text - The text to display for the dropdown.
	 * @param {JSON} options - An object containing key-value pairs that define the options for the dropdown.
	 */
	addDropdown(text: string, options: JSON): void;
	/**
	 * Add a toggle button to the form.
	 *
	 * @param {string} text - The text to display for the toggle.
	 */
	addToggle(text: string): void;
	/**
	 * Add a slider to the form.
	 *
	 * @param {string} text - The text to display for the slider.
	 * @param {number} min - The minimum value for the slider.
	 */
	addSlider(text: string, min: number, max: any, step?: number): void;
	/**
	 * Sends the custom form to a player.
	 *
	 * @param {Client} client
	 */
	send(client: Client): void;
}
