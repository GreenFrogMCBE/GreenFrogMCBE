export = ServerChunkRadiusUpdatePacket;
declare class ServerChunkRadiusUpdatePacket extends PacketConstructor {
    /** @type {number} */
    chunk_radius: number;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
