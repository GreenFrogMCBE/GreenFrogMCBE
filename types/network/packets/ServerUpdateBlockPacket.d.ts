export = ServerUpdateBlockPacket;
declare class ServerUpdateBlockPacket extends PacketConstructor {
    /**
     * Sets the X coordinate
     * @param {number} new_x
     */
    setX(new_x: number): void;
    /**
     * Sets the Y coordinate
     * @param {number} new_y
     */
    setY(new_y: number): void;
    /**
     * Sets the Z coordinate
     * @param {number} new_z
     */
    setZ(new_z: number): void;
    /**
     * Sets the block runtime id
     * @param {number} new_block_runtime_id
     */
    setBlockRuntimeId(new_block_runtime_id: number): void;
    /**
     * Sets the flags count (aka flags value).
     * @param {number} new_flags_value
     */
    setFlagsValue(new_flags_value: number): void;
    /**
     * Sets the flag value called "neighbors".
     * @param {number} new_neighbors
     */
    setNeighbors(new_neighbors: number): void;
    /**
     * Sets the flag value called "network".
     * @param {number} new_network
     */
    setNetwork(new_network: number): void;
    /**
     * Sets the flag value called "no_graphic".
     * @param {number} new_no_graphic
     */
    setNoGraphic(new_no_graphic: number): void;
    /**
     * Sets the flags value called "unused".
     * @param {number} new_unused
     */
    setUnused(new_unused: number): void;
    /**
     * Sets the flag value called "priority".
     * @param {number} new_priority
     */
    setPriority(new_priority: number): void;
    /**
     * Sets the layer.
     * @param {number} new_layer
     */
    setLayer(new_layer: number): void;
    /**
     * Returns the X coordinate.
     * @returns {number} The X coordinate.
     */
    getX(): number;
    /**
     * Returns the Y coordinate.
     * @returns {number} The Y coordinate.
     */
    getY(): number;
    /**
     * Returns the Z coordinate.
     * @returns {number} The Z coordinate.
     */
    getZ(): number;
    /**
     * Returns the block runtime id.
     * @returns {number} The block runtime id.
     */
    getBlockRuntimeId(): number;
    /**
     * Returns the flags value.
     * @returns {number} The flags value.
     */
    getFlagsValue(): number;
    /**
     * Returns the flag value called "neighbors".
     * @returns {number} The flag value called "neighbors".
     */
    getNeighbors(): number;
    /**
     * Returns the flag value called "network".
     * @returns {number} The flag value called "network".
     */
    getNetwork(): number;
    /**
     * Returns the flag value called "no_graphic".
     * @returns {number} The flag value called "no_graphic".
     */
    getNoGraphic(): number;
    /**
     * Returns the flags value called "unused".
     * @returns {number} The flags value called "unused".
     */
    getUnused(): number;
    /**
     * Returns the flags value called "priority".
     * @returns {number} The flags value called "priority".
     */
    getPriority(): number;
    /**
     * Returns the layer.
     * @returns {number} The layer.
     */
    getLayer(): number;
    /**
     * Sends the packet to the client
     * @param {Client} client
     */
    writePacket(client: Client): void;
}
import PacketConstructor = require("./PacketConstructor");
