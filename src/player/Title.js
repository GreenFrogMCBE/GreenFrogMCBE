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
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Frog = require("../Frog");

const ServerSetTitlePacket = require("../network/packets/ServerSetTitlePacket");

const TitleType = require("./types/Title");

class Title {
	constructor() {
		/** @type {import("Frog").Title} */
		this.type = TitleType.TITLE;
		/** @type {string} */
		this.text;
		/** @type {number} */
		this.fadeInTime = 20;
		/** @type {number} */
		this.stayTime = 20;
		/** @type {number} */
		this.fadeOutTime = 20;
	}

	/**
	 * Sends the title to the client
	 *
	 * @param {import("Frog").Player} client The client to send the title to
	 */
	send(client) {
		let shouldSendTitle = true;

		Frog.eventEmitter.emit("serverTitle", {
			fadeInTime: this.fadeInTime,
			fadeOutTime: this.fadeOutTime,
			stayTime: this.stayTime,
			text: this.text,
			type: this.type,
			cancel: () => {
				shouldSendTitle = false;
			},
		});

		if (!shouldSendTitle) return;

		const titlePacket = new ServerSetTitlePacket();
		titlePacket.fade_in_time = this.fadeInTime;
		titlePacket.stay_time = this.stayTime;
		titlePacket.text = this.text;
		titlePacket.type = this.type;
		titlePacket.fade_out_time = this.fadeOutTime;
		titlePacket.xuid = "";
		titlePacket.platform_online_id = "";
		titlePacket.writePacket(client);
	}
}

module.exports = Title;
