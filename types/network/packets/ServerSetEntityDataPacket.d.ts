export = ServerSetEntityDataPacket;
declare class ServerSetEntityDataPacket extends PacketConstructor {
    /** @type {JSON} */
    properties: JSON;
    /** @type {string} */
    tick: string;
    /** @type {JSON} */
    value: JSON;
    /** @type {string} */
    runtime_entity_id: string;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
