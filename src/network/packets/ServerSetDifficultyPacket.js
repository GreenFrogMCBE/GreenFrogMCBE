const Difficulty = require('./types/Difficulty')

let difficulty = Difficulty.PEACEFUL;

const PacketConstructor = require("./PacketConstructor");

class ServerSetDifficultyPacket extends PacketConstructor {
    /**
     * Returns the packet name
     * @returns {String} The name of the packet
     */
    getPacketName() {
        return "set_difficulty";
    }

    /**
     * Returns if is the packet critical?
     * @returns {Boolean} Returns if the packet is critical
     */
    isCriticalPacket() {
        return false
    }

    /**
     * Sets the difficulty
     * @param {Difficulty} new_difficulty 
     */
    setDifficulty(new_difficulty) {
        difficulty = new_difficulty;
    }

    /**
     * Returns the difficulty
     * @returns {Difficulty}
     */
    getDifficulty() {
        return difficulty;
    }

	/**
	 * Sends the packet to the client
	 * @param {any} client
	 */
    writePacket(client) {
        client.queue(this.getPacketName(), { difficulty: this.getDifficulty() })
    }
}

module.exports = ServerSetDifficultyPacket