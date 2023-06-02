export = ServerMoveEntityDataPacket;
declare class ServerMoveEntityDataPacket extends PacketConstructor {
    /**
     * Returns the runtime entity ID
     * @returns {float} The runtime entity ID
     */
    getRuntimeEntityId(): float;
    /**
     * Sets the runtime entity ID
     * @param {float} value - The runtime entity ID value to set
     */
    setRuntimeEntityId(value: float): void;
    /**
     * Returns The X coordinate
     * @returns {float} The X coordinate
     */
    getX(): float;
    /**
     * Sets the X coordinate
     * @param {float} value - The X coordinate value to set
     */
    setX(value: float): void;
    /**
     * Returns the Y coordinate
     * @returns {float} The Y coordinate
     */
    getY(): float;
    /**
     * Sets the Y coordinate
     * @param {float} value - The Y coordinate value to set
     */
    setY(value: float): void;
    /**
     * Returns the z coordinate
     * @returns {float} The z coordinate
     */
    getZ(): float;
    /**
     * Sets the z coordinate
     * @param {float} value - The z coordinate value to set
     */
    setZ(value: float): void;
    /**
     * Returns the X rotation
     * @returns {float} The X rotation
     */
    getRotX(): float;
    /**
     * Sets the X rotation
     * @param {float} value - The X rotation value to set
     */
    setRotX(value: float): void;
    /**
     * Returns the Y rotation
     * @returns {float} The Y rotation
     */
    getRotY(): float;
    /**
     * Sets the Y rotation
     * @param {float} value - The Y rotation value to set
     */
    setRotY(value: float): void;
    /**
     * Returns the Z rotation
     * @returns {float} The Z rotation
     */
    getRotZ(): float;
    /**
     * Sets the Z rotation
     * @param {float} value - The Z rotation value to set
     */
    setRotZ(value: float): void;
    /**
     * Sets the flags
     * @param {float} value - The flags value to set
     */
    setFlags(value: float): void;
    /**
     * Returns the flags
     * @returns {JSON} The flags
     */
    getFlags(): JSON;
    /**
     * Writes the packet to the client queue
     * @param {Client} client - The client to send the packet to
     */
    writePacket(client: Client): void;
}
import PacketConstructor = require("./PacketConstructor");
