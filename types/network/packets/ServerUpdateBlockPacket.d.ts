export = ServerUpdateBlockPacket;
declare class ServerUpdateBlockPacket extends PacketConstructor {
    /** @type {number} */
    x: number;
    /** @type {number} */
    y: number;
    /** @type {number} */
    z: number;
    /** @type {number} */
    block_runtime_id: number;
    /** @type {boolean} */
    neighbors: boolean;
    /** @type {boolean} */
    network: boolean;
    /** @type {boolean} */
    no_graphic: boolean;
    /** @type {boolean} */
    unused: boolean;
    /** @type {boolean} */
    priority: boolean;
    /** @type {number} */
    layer: number;
    /** @type {number} */
    flags_value: number;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
