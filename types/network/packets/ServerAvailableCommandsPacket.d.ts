export = ServerAvailableCommandsPacket;
declare class ServerAvailableCommandsPacket extends PacketConstructor {
    /**
     * Sets the command data
     * @param {JSON} new_data - The new command data
     */
    setData(new_data: JSON): void;
    /**
     * Returns the command data
     * @returns {JSON} The command data
     */
    getData(): JSON;
    /**
     * Sends the packet to the client
     * @param {Client} client
     */
    writePacket(client: Client): void;
}
import PacketConstructor = require("./PacketConstructor");
