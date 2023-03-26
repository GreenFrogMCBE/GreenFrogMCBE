export = ClientItemStackRequestPacket;
declare class ClientItemStackRequestPacket extends PacketConstructor {
    validatePacket(player: any): void;
    /**
     * Reads the packet from player
     * @param {any} player
     * @param {JSON} packet
     */
    readPacket(player: any, packet: JSON): any;
}
import PacketConstructor = require("./PacketConstructor");
