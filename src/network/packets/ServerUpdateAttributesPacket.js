const PacketConstructor = require("./PacketConstructor");

let id = -1;
let attributes = null;
let tick = -1;

class UpdateAttributes extends PacketConstructor {
	/**
	* Returns the packet name
	* @returns The name of the packet
	*/
	getPacketName() {
		return "update_attributes";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}
	

    /**
     * Sets the player id
     * @param {Int} playerid
     */
    setPlayerID(playerid) {
        id = playerid;
    }

    /**
     * Returns the player ID
     */
    getPlayerID() {
        return id;
    }

    /**
     * Sets the attributes
     * @param {Array<JSON>} attr
     */
    setAttributes(attr) {
        attributes = attr;
    }

    /**
     * Returns the attributes
     */
    getAttributes() {
        return attributes;
    }

    /**
     * Sets the tick
     * @param {Int} t - The tick
     */
    setTick(t) {
        tick = t;
    }

    /**
     * Returns the tick
     */
    getTick() {
        return tick;
    }

    /**
     * writePackets the packet to client
     * @param {Object} client 
     */
    writePacket(client) {
        client.queue(this.getPacketName(), { 
            runtime_entity_id: this.getPlayerID(),
            attributes: this.getAttributes(),
            tick: this.getTick()
        });
    }
}

module.exports = UpdateAttributes;