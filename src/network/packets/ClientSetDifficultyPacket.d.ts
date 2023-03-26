export = ClientSetDifficultyPacket;
declare class ClientSetDifficultyPacket extends PacketConstructor {
    validatePacket(player: any): any;
    /**
     * Reads the packet from player
     * @param {any} player
     * @param {JSON} packet
     * @param {any} server
     */
    readPacket(player: any, packet: JSON): any;
}
import PacketConstructor = require("./PacketConstructor");
