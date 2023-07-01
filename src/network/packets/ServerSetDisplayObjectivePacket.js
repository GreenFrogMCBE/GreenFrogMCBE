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
const DisplaySlot = require("../../scoreboard/types/DisplaySlot");

const PacketConstructor = require("./PacketConstructor");

class ServerScoreboardObjectivePacket extends PacketConstructor {
	name = 'set_display_objective'
	/** @type {DisplaySlot} */
	display_slot;
	/** @type {string} */
	objective_name
	/** @type {string} */
	display_name
	/** @type {CreterialName} */
	criteria_name
	/** @type {number} */
	sort_order

	writePacket(client) {
		client.queue(this.name, {
			display_slot: this.display_slot,
			objective_name: this.objective_name,
			display_name: this.display_name,
			criteria_name: this.criteria_name,
			sort_order: this.sort_order,
		});
	}
}

module.exports = ServerScoreboardObjectivePacket;
