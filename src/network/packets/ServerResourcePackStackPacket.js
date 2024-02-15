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
const Packet = require("./Packet")

class ServerResourcePackStackPacket extends Packet {
	name = "resource_pack_stack"

	/** @type {any[] | undefined} */
	behavior_packs
	/** @type {any[] | undefined} */
	resource_packs
	/** @type {string | undefined} */
	game_version
	/** @type {boolean | undefined} */
	must_accept
	/** @type {any[] | undefined} */
	experiments
	/** @type {boolean | undefined} */
	experiments_previously_used

	/**
	 * @param {import("Frog").Player} player
	 */
	write_packet(player) {
		player.queue(this.name, {
			must_accept: this.must_accept,
			behavior_packs: this.behavior_packs,
			resource_packs: this.resource_packs,
			game_version: this.game_version,
			experiments: this.experiments,
			experiments_previously_used: this.experiments_previously_used,
		})
	}
}

module.exports = ServerResourcePackStackPacket
