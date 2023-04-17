const PacketConstructor = require("./PacketConstructor");

let runtimeEntityID = 0;
let velocity = {}

class ServerSetEntityMotion extends PacketConstructor {
    /**
     * Returns the name of the packet
     * @returns {String} The name of the packet
     */
    getPacketName() {
        return "set_entity_motion";
    }

    /**
     * Returns whether the packet is critical or not
     * @returns {Boolean} True if the packet is critical, false otherwise
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
     * @returns {Number}
     */
    getRuntimeEntityID() {
        return runtimeEntityID
    }

    /**
     * Sets the runtime entity ID
     * @param {Number} value
     */
    setRuntimeEntityID(value) {
        runtimeEntityID = value
    }

    /**
     * Sends the packet to the client
     * @param {Client} client
     */
    writePacket(client) {
        client.queue(this.getPacketName(), {
            runtime_entity_id: this.getRuntimeEntityID(),
            velocity: this.getVelocity()
        })
    }
}

module.exports = ServerSetEntityMotion;