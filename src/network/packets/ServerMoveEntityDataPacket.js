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
     * Returns the packet name
     * @returns {String} The name of the packet
     */
    getPacketName() {
        return "move_entity_delta";
    }

    /**
     * Returns if is the packet critical?
     * @returns {Boolean} Returns if the packet is critical
     */
    isCriticalPacket() {
        return false;
    }

    getRuntimeEntityId() {
        return runtime_entity_id;
    }

    setRuntimeEntityId(value) {
        runtime_entity_id = value;
    }

    getX() {
        return x;
    }

    setX(value) {
        x = value;
    }

    getY() {
        return y;
    }

    setY(value) {
        y = value;
    }

    getZ() {
        return z;
    }

    setZ(value) {
        z = value;
    }

    getRotX() {
        return rot_x;
    }

    setRotX(value) {
        rot_x = value;
    }

    getRotY() {
        return rot_y;
    }

    setRotY(value) {
        rot_y = value;
    }

    getRotZ() {
        return rot_z;
    }

    setRotZ(value) {
        rot_z = value;
    }

    setFlags(value) {
        flags = value
    }

    getFlags() {
        return flags
    }

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