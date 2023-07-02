export = ServerResponsePackInfoPacket;
declare class ServerResponsePackInfoPacket extends PacketConstructor {
    /** @type {boolean} */
    must_accept: boolean;
    /** @type {boolean} */
    has_scripts: boolean;
    /** @type {Array} */
    behavior_packs: any[];
    /** @type {Array} */
    texture_packs: any[];
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
