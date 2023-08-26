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
const Title = require("../../player/types/Title");

const Packet = require("./Packet");

class ServerSetTitlePacket extends Packet {
	name = "set_title";

	/** @type {string | undefined} */
	type;
	/** @type {string | undefined} */
	text;
	/** @type {number | undefined} */
	fade_in_time;
	/** @type {number | undefined} */
	stay_time;
	/** @type {number | undefined} */
	fade_out_time;
	/** @type {string | undefined} */
	xuid;
	/** @type {string | undefined} */
	platform_online_id;

	/**
	 * @param {import("Frog").Player} player
	 */
	writePacket(player) {
		player.queue(this.name, {
			type: this.type,
			text: this.type === Title.CLEAR ? "" : this.text,
			fade_in_time: this.fade_in_time,
			stay_time: this.stay_time,
			fade_out_time: this.fade_out_time,
			xuid: this.xuid,
			platform_online_id: this.platform_online_id,
		});
	}
}

module.exports = ServerSetTitlePacket;
