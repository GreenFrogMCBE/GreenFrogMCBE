export = ServerSetEntityMotion;
declare class ServerSetEntityMotion extends PacketConstructor {
    /** @type {number} */
    runtime_entity_id: number;
    /** @type {JSON} */
    velocity: JSON;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
