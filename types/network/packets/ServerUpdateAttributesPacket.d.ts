export = ServerUpdateAttributesPacket;
declare class ServerUpdateAttributesPacket extends PacketConstructor {
    /** @type {number} */
    runtime_entity_id: number;
    /** @type {JSON} */
    attributes: JSON;
    /** @type {number} */
    tick: number;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
