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
const ScoreActions = require("../../scoreboard/types/ScoreActions");

const PacketConstructor = require("./PacketConstructor");

let action = ScoreActions.UNKNOWN;
let entries = [];

class ServerSetScorePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "set_score";
	}

	/**
	 * Returns if the packet is critical
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the action of the scoreboard update
	 * @param {ScoreActions} new_action The action to set
	 */
	setAction(new_action) {
		action = new_action;
	}

	/**
	 * Sets the entries of the scoreboard update
	 * @param {Array} new_entries The entries to set
	 */
	setEntries(new_entries) {
		entries = new_entries;
	}

	/**
	 * Returns the scoreboard action
	 * @returns {ScoreActions} The scoreboard action
	 */
	getAction() {
		return action;
	}

	/**
	 * Returns the scoreboard entries
	 * @returns {Array} The scoreboard entries
	 */
	getEntries() {
		return entries;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client The client to send the packet to
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			action: this.getAction(),
			entries: this.getEntries(),
		});
	}
}

module.exports = ServerSetScorePacket;
