let id = -1;
let attributes = null;
let tick = -1;

class UpdateAttributes extends require("./Packet") {

    /**
     * @returns The name of the packet.
     */
    name() {
        return "update_attributes";
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
     * Sends the packet to client
     * @param {Object} client 
     */
    send(client) {
        client.queue(this.name(), { 
            runtime_entity_id: this.getPlayerID(),
            attributes: this.getAttributes(),
            tick: this.getTick()
        });
    }
}

module.exports = UpdateAttributes;