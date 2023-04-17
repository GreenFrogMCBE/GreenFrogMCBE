const PacketConstructor = require("./PacketConstructor");

let x = 0
let y = 0
let z = 0
let runtime_entity_id = 0
let flags = 0
let rot_x = 0
let rot_y = 0
let rot_z = 0

class ServerMoveEntityDataPacket extends PacketConstructor {

    /**
     * Returns the name of the packet
     * @returns {String} The name of the packet
     */
    getPacketName() {
        return "move_entity_delta";
    }

    /**
     * Returns whether the packet is critical or not
     * @returns {Boolean} Returns whether the packet is critical or not
     */
    isCriticalPacket() {
        return false;
    }

    /**
     * Returns the runtime entity id
     * @returns {Number} The runtime entity id
     */
    getRuntimeEntityId() {
        return runtime_entity_id;
    }

    /**
    * @param {Number} value - The runtime entity id value to set
     */
    setRuntimeEntityId(value) {
        runtime_entity_id = value;
    }

    /**
     * Returns the x coordinate
     * @returns {Number} The x coordinate
     */
    getX() {
        return x;
    }

    /**
     * Sets the x coordinate
     * @param {Number} value - The x coordinate value to set
     */
    setX(value) {
        x = value;
    }

    /**
     * Returns the y coordinate
     * @returns {Number} The y coordinate
     */
    getY() {
        return y;
    }

    /**
     * Sets the y coordinate
     * @param {Number} value - The y coordinate value to set
     */
    setY(value) {
        y = value;
    }

    /**
     * Returns the z coordinate
     * @returns {Number} The z coordinate
     */
    getZ() {
        return z;
    }

    /**
     * Sets the z coordinate
     * @param {Number} value - The z coordinate value to set
     */
    setZ(value) {
        z = value;
    }

    /**
     * Returns the x rotation
     * @returns {Number} The x rotation
     */
    getRotX() {
        return rot_x;
    }

    /**
     * Sets the x rotation
     * @param {Number} value - The x rotation value to set
     */
    setRotX(value) {
        rot_x = value;
    }

    /**
     * Returns the y rotation
     * @returns {Number} The y rotation
     */
    getRotY() {
        return rot_y;
    }

    /**
     * Sets the y rotation
     * @param {Number} value - The y rotation value to set
     */
    setRotY(value) {
        rot_y = value;
    }

    /**
     * Returns the z rotation
     * @returns {Number} The z rotation
     */
    getRotZ() {
        return rot_z;
    }

    /**
     * Sets the z rotation
     * @param {Number} value - The z rotation value to set
     */
    setRotZ(value) {
        rot_z = value;
    }

    /**
     * Sets the flags
     * @param {Number} value - The flags value to set
     */
    setFlags(value) {
        flags = value
    }

    /**
     * Returns the flags
     * @returns {Number} The flags
     */
    getFlags() {
        return flags
    }

    /**
     * Writes the packet to the client queue
     * @param {Object} client - The client to send the packet to
     */
    writePacket(client) {
        client.queue(this.getPacketName(), {
            runtime_entity_id: this.getRuntimeEntityId(),
            flags: this.getFlags(),
            x: this.getX(),
            y: this.getY(),
            z: this.getZ(),
            rot_x: this.getRotX(),
            rot_y: this.getRotY(),
            rot_z: this.getRotZ()
        })
    }
}

module.exports = ServerMoveEntityDataPacket;