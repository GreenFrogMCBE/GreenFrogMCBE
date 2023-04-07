export = ClientInteractPacket;
declare class ClientInteractPacket extends PacketConstructor {
    /**
     * Reads the packet from client
     * @param {any} player
     * @param {JSON} packet
     */
    readPacket(player: any, packet: JSON, server: any): any;
}
import PacketConstructor = require("./PacketConstructor");
