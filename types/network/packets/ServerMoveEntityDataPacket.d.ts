export = ServerMoveEntityDataPacket;
declare class ServerMoveEntityDataPacket extends PacketConstructor {
    /** @type {JSON} */
    coordinates: JSON;
    /** @type {number} */
    runtime_entity_id: number;
    /** @type {number} */
    flags: number;
    /** @type {JSON} */
    coordinatesRotation: JSON;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
