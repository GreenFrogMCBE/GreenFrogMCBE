export = ServerSetTimePacket;
declare class ServerSetTimePacket extends PacketConstructor {
    /**
     * Sets the time
     * @param {number} time
     */
    setTime(new_time: any): void;
    /**
     * Returns the time
     * @returns {number}
     */
    getTime(): number;
    /**
     * Sends the packet to the client
     * @param {Client} client
     */
    writePacket(client: Client): void;
}
import PacketConstructor = require("./PacketConstructor");
