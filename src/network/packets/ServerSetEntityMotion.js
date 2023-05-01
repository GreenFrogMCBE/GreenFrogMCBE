
const PacketConstructor = require("./PacketConstructor");

let runtime_entity_ID = 0;
let velocity = {};

class ServerSetEntityMotion extends PacketConstructor {
	/**
	 * Returns the name of the packet
	 * @returns {string}
	 */
	getPacketName() {
		return "set_entity_motion";
	}

	/**
	 * Returns whether the packet is critical or not
	 * @returns {boolean} True if the packet is critical, false otherwise
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Returns the velocity of the entity
	 * @returns {JSON}
	 */
	getVelocity() {
		return velocity;
	}

	/**
	 * Sets the velocity of the entity
	 * @param {JSON} value
	 */
	setVelocity(value) {
		velocity = value;
	}

	/**
	 * Returns the runtime entity ID
	 * @returns {number}
	 */
	getruntime_entity_ID() {
		return runtime_entity_ID;
	}

	/**
	 * Sets the runtime entity ID
	 * @param {number} value
	 */
	setruntime_entity_ID(value) {
		runtime_entity_ID = value;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		client.queue(this.getPacketName(), {
			runtime_entity_id: this.getruntime_entity_ID(),
			velocity: this.getVelocity(),
		});
	}
}

module.exports = ServerSetEntityMotion;
