export = ServerRemoveObjectivePacket;
declare class ServerRemoveObjectivePacket extends PacketConstructor {
    /**
     * Sets the objective name
     * @param {String} new_objectivename
     */
    setObjectiveName(new_objectivename: string): void;
    /**
     * Returns the objective name
     * @returns {String}
     */
    getObjectiveName(): string;
    /**
     * Sends the packet to the client
     * @param {any} client
     */
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
