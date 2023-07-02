export = ServerContainerOpenPacket;
declare class ServerContainerOpenPacket extends PacketConstructor {
    /** @type {WindowId} */
    window_id: WindowId;
    /** @type {JSON} */
    coordinates: JSON;
    /** @type {WindowType} */
    window_type: WindowType;
    /** @type {number} */
    runtime_entity_id: number;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
