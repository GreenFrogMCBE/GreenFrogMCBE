export = ServerPlayerListPacket;
declare class ServerPlayerListPacket extends PacketConstructor {
    /**
     * Returns the player username
     * @returns {string} The player username
     */
    getUsername(): string;
    /**
     * Sets the player username
     * @param {string} new_username The player username
     */
    setUsername(new_username: string): void;
    /**
     * Returns the ID of the player
     * @returns {number} The ID of the player
     */
    getID(): number;
    /**
     * Sets the ID of the player
     * @param new_id
     */
    setID(new_id: any): void;
    /**
     * Returns the type of the packet
     * @returns {PlayerListTypes} The type
     */
    getType(): {
        readonly ADD: "add";
        readonly REMOVE: "remove";
    };
    /**
     * Returns the UUID of the player
     * @returns {UUID} The UUID of the player
     */
    getUUID(): UUID;
    /**
     * Sets the UUID of the player
     * @param {UUID} new_uuid The UUID to set for the player
     */
    setUUID(new_uuid: UUID): void;
    /**
     * Sets the type
     * @param {PlayerListTypes} new_type The type. Valid types are ADD or REMOVE
     */
    setType(new_type: {
        readonly ADD: "add";
        readonly REMOVE: "remove";
    }): void;
    /**
     * Sets the xbox id of user
     * @param {string} id
     */
    setXboxID(new_id: any): void;
    /**
     * Returns the xbox id of user
     * @returns {string}
     */
    getXboxID(): string;
    /**
     * Sends the packet to the client
     * @param {Client} client
     */
    writePacket(client: Client): void;
}
import PacketConstructor = require("./PacketConstructor");
