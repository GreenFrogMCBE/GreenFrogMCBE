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

class ServerResponsePackInfoPacket extends Packet {
	name = "resource_packs_info";

	/** @type {boolean | undefined} */
	must_accept;
	/** @type {boolean | undefined} */
	has_scripts;
	/** @type {any[] | undefined} */
	behavior_packs;
	/** @type {any[] | undefined} */
	texture_packs;
	/** @type {import("Frog").ResourcePackLink[] | [] | undefined} */
	resource_pack_links;

	/**
	 * @param {import("Frog").Player} player
	 */
	writePacket(player) {
		player.queue(this.name, {
			must_accept: this.must_accept,
			has_scripts: this.has_scripts,
			behaviour_packs: this.behavior_packs,
			texture_packs: this.texture_packs,
			resource_pack_links: this.resource_pack_links,
		});
	}
}

module.exports = ServerResponsePackInfoPacket;
