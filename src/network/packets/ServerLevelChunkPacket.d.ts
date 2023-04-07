export = ServerLevelChunkPacket;
declare class ServerLevelChunkPacket extends PacketConstructor {
    /**
     * Sets the X coordinate
     * @param {Number} new_x
     */
    setX(new_x: number): void;
    /**
     * Sets the Z coordinate
     * @param {Number} new_z
     */
    setZ(new_z: number): void;
    /**
     * Sets the sub chunk count
     * @param {Number} new_sub_chunk_count
     */
    setSubChunkCount(new_sub_chunk_count: number): void;
    /**
     * Sets if the cache is enabled
     * @param {Boolean} new_cache_enabled
     */
    setCacheEnabled(new_cache_enabled: boolean): void;
    /**
     * Sets the chunk payload
     * @param {JSON} new_payload
     */
    setPayload(new_payload: JSON): void;
    /**
     * It gets the X coordinate
     * @returns {Number}
     */
    getX(): number;
    /**
     * It gets the Z coordinate
     * @returns {Number}
     */
    getZ(): number;
    /**
     * It gets the sub chunk count
     * @returns {Number}
     */
    getSubChunkCount(): number;
    /**
     * Returns if the cache is enabled
     * @returns {Boolean}
     */
    getCacheEnabled(): boolean;
    /**
     * Returns the payload
     * @returns {JSON}
     */
    getPayload(): JSON;
    /**
     * Sends the packet to the client
     * @param {any} client
     */
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
