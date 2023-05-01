let data = null;

const PacketConstructor = require("./PacketConstructor");

class ServerAvailableCommandsPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "available_commands";
	}

	/**
	 * Returns if the packet is critical?
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Sets the command data
	 * @param {JSON} new_data - The new command data
	 */
	setData(new_data) {
		data = new_data;
	}

	/**
	 * Returns the command data
	 * @returns {JSON} The command data
	 */
	getData() {
		return data;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), this.getData());
	}
}

module.exports = ServerAvailableCommandsPacket;
