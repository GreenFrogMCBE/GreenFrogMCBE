export = ServerSetHealthPacket;
declare class ServerSetHealthPacket extends PacketConstructor {
    /** @type {number} */
    health: number;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
