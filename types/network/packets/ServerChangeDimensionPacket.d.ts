export = ServerChangeDimensionPacket;
declare class ServerChangeDimensionPacket extends PacketConstructor {
    /** @type {DimensionLegacy} */
    dimension: {
        readonly OVERWORLD: 0;
        readonly NETHER: 1;
        readonly END: 2;
    };
    /** @type {JSON} */
    position: JSON;
    /** @type {boolean} */
    respawn: boolean;
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
