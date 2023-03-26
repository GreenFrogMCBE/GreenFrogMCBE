export = ClientContainerClosePacket;
declare class ClientContainerClosePacket extends PacketConstructor {
    /**
     * Reads the packet from client
     * @param {any} player
     * @param {JSON} packet
     */
    readPacket(player: any): any;
}
import PacketConstructor = require("./PacketConstructor");
