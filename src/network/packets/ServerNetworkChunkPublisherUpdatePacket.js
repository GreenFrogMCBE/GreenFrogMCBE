const Packet = require("./Packet");

class ServerNetworkChunkPublisherUpdatePacket extends Packet {
    name = "network_chunk_publisher_update";
    
    /** @type {import("Frog").Coordinate | undefined} */
    coordinates;
    /** @type {number | undefined} */
    radius;
    /** @type {any[] | undefined} */
    saved_chunks;

    /**
     * @param {import("Frog").Player} player
     */
    writePacket(player) {
        player.queue(this.name, {
            coordinates: this.coordinates,
            radius: this.radius,
            saved_chunks: this.saved_chunks,
        });
    }
}

module.exports = ServerNetworkChunkPublisherUpdatePacket;
