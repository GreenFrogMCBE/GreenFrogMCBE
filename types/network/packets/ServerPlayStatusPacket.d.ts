export = ServerPlayStatusPacket;
declare class ServerPlayStatusPacket extends PacketConstructor {
    /** @type {PlayStatusType} */
    status: PlayStatusType;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
