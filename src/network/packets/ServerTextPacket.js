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
const Packet = require("./Packet");

class ServerTextPacket extends Packet {
	name = "text";

	/** @type {string | undefined} */
	message;
	/** @type {import("Frog").Text | undefined} */
	type;
	/** @type {boolean | undefined} */
	needs_translation;
	/** @type {string | undefined} */
	source_name;
	/** @type {string | undefined} */
	xuid;
	/** @type {string | undefined} */
	platform_chat_id;

	/**
	 * @param {import("Frog").Player} player
	 */
	writePacket(player) {
		player.queue(this.name, {
			type: this.type,
			needs_translation: this.needs_translation,
			source_name: this.source_name,
			message: this.message,
			xuid: this.xuid,
			platform_chat_id: this.platform_chat_id,
		});
	}
}

module.exports = ServerTextPacket;
