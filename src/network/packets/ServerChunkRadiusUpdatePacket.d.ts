export = ServerChunkRadiusUpdatePacket;
declare class ServerChunkRadiusUpdatePacket extends PacketConstructor {
    /**
     * Sets the chunk radius
     * @param {Number} radius
     */
    setChunkRadius(new_radius: any): void;
    /**
     * Returns the chunk radius
     * @returns {Number} The chunk radius
     */
    getChunkRadius(): number;
    /**
     * Sends the packet to the client
     * @param {any} client
     */
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
