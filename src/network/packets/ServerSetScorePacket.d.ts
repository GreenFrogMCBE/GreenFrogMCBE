export = ServerSetScorePacket;
declare class ServerSetScorePacket extends PacketConstructor {
    /**
     * Sets the action of the scoreboard update
     * @param {ScoreActions} new_action The action to set
     */
    setAction(new_action: ScoreActions): void;
    /**
     * Sets the entries of the scoreboard update
     * @param {Array} new_entries The entries to set
     */
    setEntries(new_entries: Array): void;
    /**
     * Returns the scoreboard action
     * @returns {ScoreActions} The scoreboard action
     */
    getAction(): ScoreActions;
    /**
     * Returns the scoreboard entries
     * @returns {Array} The scoreboard entries
     */
    getEntries(): Array;
    /**
     * Sends the packet to the client
     * @param {any} client The client to send the packet to
     */
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
