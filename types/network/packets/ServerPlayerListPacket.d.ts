export = ServerPlayerListPacket;
declare class ServerPlayerListPacket extends PacketConstructor {
    /** @type {string} */
    username: string;
    /** @type {string} */
    uuid: string;
    /** @type {number} */
    id: number;
    /** @type {PlayerListType} */
    type: {
        readonly ADD: "add";
        readonly REMOVE: "remove";
    };
    /** @type {number} */
    xbox_id: number;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
