export = ServerTransferPacket;
declare class ServerTransferPacket extends PacketConstructor {
    /** @type {string} */
    server_address: string;
    /** @type {number} */
    port: number;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
