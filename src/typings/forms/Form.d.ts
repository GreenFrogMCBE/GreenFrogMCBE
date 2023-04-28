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
export = Form;
declare class Form {
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
	 * The title of the form.
	 * @type {string}
	 */
	title: string;
	/**
	 * The buttons in the form.
	 * @type {Array}
	 */
	buttons: any[];
	/**
	 * @type {function}
	 *
	 * @param {Form} form
	 * @param {Client} client
	 */
	onSend: Function;
	/**
	 * The ID of the form.
	 * @type {number}
	 */
	id: number;
	/**
	 * The text in the form.
	 * @type {Array}
	 */
	text: any[];
	send(client: any): void;
}
