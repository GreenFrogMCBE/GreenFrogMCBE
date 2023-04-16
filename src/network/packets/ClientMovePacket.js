const Frog = require("../../Frog");
const PacketConstructor = require("./PacketConstructor");

class ClientMovePacket extends PacketConstructor {
    /**
     * Returns the packet name
     * @returns {String} The name of the packet
     */
    getPacketName() {
        return "move_player";
    }

    /**
     * Returns if is the packet critical?
     * @returns {Boolean} Returns if the packet is critical
     */
    isCriticalPacket() {
        return false;
    }

    /**
     * Reads the packet from player
     * 
     * @param {Client} player
     * @param {JSON} packet
     * @param {Server} server
     */
    async readPacket(player, packet, server) {
        const { x, y, z } = packet.data.params.position
        const { pitch, yaw } = packet.data.params

        Frog.eventEmitter.emit('playerMove', {
            player,
            server,
            x,
            y,
            z,
            pitch,
            yaw,
            legacyPacket: true
        })
    }
}

module.exports = ClientMovePacket