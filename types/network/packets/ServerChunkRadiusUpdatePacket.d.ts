export = ServerChunkRadiusUpdatePacket;
declare class ServerChunkRadiusUpdatePacket extends PacketConstructor {
    /**
     * Sets the chunk radius
     * @param {number} radius
     */
    setChunkRadius(new_radius: any): void;
    /**
     * Returns the chunk radius
     * @returns {number} The chunk radius
     */
    getChunkRadius(): number;
    /**
     * Sends the packet to the client
     * @param {Client} client
     */
    writePacket(client: Client): void;
}
import PacketConstructor = require("./PacketConstructor");
