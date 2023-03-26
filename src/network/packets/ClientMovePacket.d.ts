export = ClientMovePacket;
declare class ClientMovePacket extends PacketConstructor {
    /**
     * Reads the packet from player
     * @param {any} player
     * @param {JSON} packet
     * @param {any} server
     */
    readPacket(player: any, packet: JSON, server: any): any;
}
import PacketConstructor = require("./PacketConstructor");
