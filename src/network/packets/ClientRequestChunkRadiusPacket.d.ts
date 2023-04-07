export = ClientRequestChunkRadiusPacket;
declare class ClientRequestChunkRadiusPacket extends PacketConstructor {
    /**
     * Reads the packet from player
     * @param {any} player
     * @param {JSON} packet
     */
    readPacket(player: any, _packet: any, server: any): any;
}
import PacketConstructor = require("./PacketConstructor");
