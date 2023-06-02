export = PacketConstructor;
declare class PacketConstructor {
    /**
     * Returns the packet name
     * @returns {string}
     */
    getPacketName(): string;
    /**
     * Validates the packet
     */
    validatePacket(): void;
    /**
     * Writes the packet
     */
    writePacket(): void;
    /**
     * Reads the packet
     */
    readPacket(): void;
}
