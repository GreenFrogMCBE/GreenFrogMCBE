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
const Title = require("../../api/types/Title");

const PacketConstructor = require("./PacketConstructor");

class ServerSetTitlePacket extends PacketConstructor {
	name = "set_title";
	/** @type {import("../../api/types/Title")} */
	type;
	/** @type {string} */
	text;
	/** @type {number} */
	fade_in_time;
	/** @type {number} */
	stay_time;
	/** @type {number} */
	fade_out_time;
	/** @type {string} */
	xuid;
	/** @type {string} */
	platform_online_id;

	writePacket(client) {
		if (this.getType() === Title.CLEAR) this.text = "";

		client.queue(this.getPacketName(), {
			type: this.type,
			text: this.text,
			fade_in_time: this.fade_in_time,
			stay_time: this.stay_time,
			fade_out_time: this.fade_out_time,
			xuid: this.xuid,
			platform_online_id: this.platform_online_id,
		});
	}
}

module.exports = ServerSetTitlePacket;
