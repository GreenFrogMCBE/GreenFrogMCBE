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
const FormTypess = require("../../forms/types/FormTypes");

const PacketConstructor = require("./PacketConstructor");

class ServerFormRequestPacket extends PacketConstructor {
	name = 'modal_form_request'
	/** @type {number} */
	form_id
	/** @type {JSON} */
	content
	/** @type {Array} */
	buttons
	/** @type {string} */
	title
	/** @type {string} */
	type
	/** @type {string} */
	button1
	/** @type {string} */
	button2

	writePacket(client) {
		let data = `{"content":${this.contect},"buttons":${this.buttons},"type":"${this.type}","title":"${this.title}"}`

		if (type === FormTypess.MODAL_FORM) {
			data = `{"content":"${this.text}","button1":"${this.button1}","button2":"${this.button2}","type":"${this.type}","title":"${this.title}"}`
		}

		client.queue(this.name, {
			form_id: this.id,
			data: data
		});
	}
}

module.exports = ServerFormRequestPacket;
