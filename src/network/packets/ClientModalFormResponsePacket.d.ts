export = ClientModalFormResponsePacket;
declare class ClientModalFormResponsePacket extends PacketConstructor {
    /**
     * Reads the packet from player
     * @param {any} player
     * @param {JSON} packet
     */
    readPacket(player: any, packet: JSON, server: any): any;
}
import PacketConstructor = require("./PacketConstructor");
