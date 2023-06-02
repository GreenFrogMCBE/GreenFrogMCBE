export = ServerRemoveObjectivePacket;
declare class ServerRemoveObjectivePacket extends PacketConstructor {
    /**
     * Sets the objective name
     * @param {string} new_objectivename
     */
    setObjectiveName(new_objectivename: string): void;
    /**
     * Returns the objective name
     * @returns {string}
     */
    getObjectiveName(): string;
    /**
     * Sends the packet to the client
     * @param {Client} client
     */
    writePacket(client: Client): void;
}
import PacketConstructor = require("./PacketConstructor");
