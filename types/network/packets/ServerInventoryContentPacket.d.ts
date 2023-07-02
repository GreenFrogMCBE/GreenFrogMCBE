export = ServerInventoryContentPacket;
declare class ServerInventoryContentPacket extends PacketConstructor {
    /** @type {Array} */
    input: any[];
    /** @type {number} */
    window_id: number;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
