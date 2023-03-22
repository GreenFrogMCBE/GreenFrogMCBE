const DefaultWorld = require("../../world/DefaultWorld");

const PacketHandlingError = require("./exceptions/PacketHandlingError");

const PacketConstructor = require("./PacketConstructor");

class ClientSetDifficultyPacket extends PacketConstructor {
    /**
     * Returns the packet name
     * @returns {String} The name of the packet
     */
    getPacketName() {
        return "set_difficulty"
    }

    /**
     * Returns if is the packet critical?
     * @returns {Boolean} Returns if the packet is critical
     */
    isCriticalPacket() {
        return false
    }

    async validatePacket(player) {
        if (!player.op) throw new PacketHandlingError("Invalid set difficulty packet! Cannot update the server difficulty without being OP")
    }

    /**
     * Reads the packet from player
     * @param {any} player
     * @param {JSON} packet
     * @param {any} server
     */
    async readPacket(player, packet) {
        await this.validatePacket(player)

        for (const player of new DefaultWorld().getPlayersInWorld()) {
            player.setDifficulty(packet.data.params.difficulty)
        }
    }
}

module.exports = ClientSetDifficultyPacket