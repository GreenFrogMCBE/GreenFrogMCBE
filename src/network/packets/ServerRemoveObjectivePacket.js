let objective_name;

const PacketConstructor = require("./PacketConstructor");

class ServerRemoveObjectivePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "remove_objective";
	}

	/**
	 * Returns if the packet is critical?
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the objective name
	 * @param {string} new_objectivename
	 */
	setObjectiveName(new_objectivename) {
		objective_name = new_objectivename;
	}

	/**
	 * Returns the objective name
	 * @returns {string}
	 */
	getObjectiveName() {
		return objective_name;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			objective_name: this.getObjectiveName(),
		});
	}
}

module.exports = ServerRemoveObjectivePacket;
