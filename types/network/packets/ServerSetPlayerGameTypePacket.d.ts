export = ServerSetPlayerGameTypePacket;
declare class ServerSetPlayerGameTypePacket extends PacketConstructor {
    /** @type {Gamemode} */
    gamemode: Gamemode;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
