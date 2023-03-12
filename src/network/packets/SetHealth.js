let health = 0;

class SetHealth extends require("./Packet") {
    /**
     * @returns The name of the packet.
     */
    name() {
        return "set_health";
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
     * Sends the packet to client
     * @param {Object} client 
     */
    send(client) {
        client.queue(this.name(), { health: this.getHealth() })
    }
}

module.exports = SetHealth