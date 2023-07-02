export = ServerSetTimePacket;
declare class ServerSetTimePacket extends PacketConstructor {
    /** @type {number} */
    time: number;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
