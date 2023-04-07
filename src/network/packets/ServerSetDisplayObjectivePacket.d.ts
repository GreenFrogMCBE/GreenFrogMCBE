export = ServerScoreboardObjectivePacket;
declare class ServerScoreboardObjectivePacket extends PacketConstructor {
    /**
     * Sets the display slot.
     * @param {DisplaySlots} slot The display slot to set.
     */
    setDisplaySlot(slot: {
        LIST: string;
        SIDEBAR: string;
        BELOWNAME: string;
    }): void;
    /**
     * Sets the objective name.
     * @param {String} name The objective name to set.
     */
    setObjectiveName(name: string): void;
    /**
     * Sets the display name.
     * @param {String} name The display name to set.
     */
    setDisplayName(name: string): void;
    /**
     * Sets the criteria name.
     * @param {String} name The criteria name to set.
     */
    setCriteriaName(name: string): void;
    /**
     * Sets the sort order.
     * @param {Number} order The sort order to set.
     */
    setSortOrder(order: number): void;
    /**
     * Returns the display slot.
     * @returns {DisplaySlots} The display slot.
     */
    getDisplaySlot(): {
        LIST: string;
        SIDEBAR: string;
        BELOWNAME: string;
    };
    /**
     * Returns the objective name.
     * @returns {String} The objective name.
     */
    getObjectiveName(): string;
    /**
     * Returns the display name.
     * @returns {String} The display name.
     */
    getDisplayName(): string;
    /**
     * Returns the criteria name.
     * @returns {String} The criteria name.
     */
    getCriteriaName(): string;
    /**
     * Returns the sort order.
     * @returns {Number} The sort order.
     */
    getSortOrder(): number;
    /**
     * Sends the packet to the client.
     * @param {any} client
     */
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
