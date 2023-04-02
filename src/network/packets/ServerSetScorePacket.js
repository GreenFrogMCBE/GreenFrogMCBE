const PacketConstructor = require("./PacketConstructor");

let action;
let entries;

class ServerSetScorePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "set_score";
	}

	/**
	 * Returns if the packet is critical
	 * @returns {Boolean} Returns if the packet is critical
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
	 * @param {any} client The client to send the packet to
	 */
	writePacket(client) {
		console.log(this.getAction())

		client.queue(this.getPacketName(), {
			action: this.getAction(),
			entries: this.getEntries()
		});
	}
}

module.exports = ServerSetScorePacket;