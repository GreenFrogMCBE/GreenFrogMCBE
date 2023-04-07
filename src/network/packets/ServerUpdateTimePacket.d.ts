export = ServerUpdateTimePacket;
declare class ServerUpdateTimePacket extends PacketConstructor {
    /**
     * Sets the time
     * @param {Number} time
     */
    setTime(new_time: any): void;
    /**
     * Returns the time
     * @returns {Number}
     */
    getTime(): number;
    /**
     * Sends the packet to the client
     * @param {any} client
     */
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
