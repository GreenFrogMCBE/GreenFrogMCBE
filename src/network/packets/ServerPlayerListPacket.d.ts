export = ServerPlayerListPacket;
declare class ServerPlayerListPacket extends PacketConstructor {
    /**
     * Returns the player username
     * @returns {String} The player username
     */
    getUsername(): string;
    /**
     * Sets the player username
     * @param {String} new_username The player username
     */
    setUsername(new_username: string): void;
    /**
     * Returns the ID of the player
     * @returns {Number} The ID of the player
     */
    getId(): number;
    /**
     * Sets the ID of the player
     * @param new_id
     */
    setId(new_id: any): void;
    /**
     * Returns the type of the packet
     * @returns {PlayerListTypes} The type
     */
    getType(): typeof PlayerListTypes;
    /**
     * Returns the UUID of the player
     * @returns {UUID} The UUID of the player
     */
    getUuid(): UUID;
    /**
     * Sets the UUID of the player
     * @param {UUID} new_uuid The UUID to set for the player
     */
    setUuid(new_uuid: UUID): void;
    /**
     * Sets the type
     * @param {PlayerListTypes} new_type The type. Valid types are ADD or REMOVE
     */
    setType(new_type: typeof PlayerListTypes): void;
    /**
     * Sets the xbox id of user
     * @param {String} id
     */
    setXboxID(new_id: any): void;
    /**
     * Returns the xbox id of user
     * @returns {String}
     */
    getXboxID(): string;
    /**
     * Sends the packet to the client
     * @param {any} client
     */
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
import PlayerListTypes = require("./types/PlayerList");
