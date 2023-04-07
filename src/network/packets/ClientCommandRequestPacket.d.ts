export = ClientCommandRequestPacket;
declare class ClientCommandRequestPacket extends PacketConstructor {
    /**
     * Reads the packet from client
     * @param {any} player
     * @param {JSON} packet
     * @param {any} server
     */
    readPacket(player: any, packet: JSON, server: any): any;
}
import PacketConstructor = require("./PacketConstructor");
