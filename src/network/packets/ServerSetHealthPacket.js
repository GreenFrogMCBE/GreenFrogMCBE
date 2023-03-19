let health = 0;

const PacketConstructor = require("./PacketConstructor");

class SetHealth extends PacketConstructor {
	/**
	* Returns the packet name
	* @returns The name of the packet
	*/
	getPacketName() {
		return "set_health";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}
    /**
     * Sets the player health
     */
    setHealth(playerhealth) {
        health = playerhealth;
    }

    /**
     * Returns the player health
     */
    getHealth() {
        return health;
    }

    /**
     * writePackets the packet to client
     * @param {Object} client 
     */
    writePacket(client) {
        client.queue(this.getPacketName(), { health: this.getHealth() })
    }
}

module.exports = SetHealth