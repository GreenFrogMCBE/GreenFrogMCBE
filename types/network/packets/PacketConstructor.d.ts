export = PacketConstructor;
declare class PacketConstructor {
    /** @type {string} */
    name: string;
    validatePacket(): void;
    /**
     * @param {Client} player
     */
    writePacket(): void;
    /**
     * @param {Client} player
     * @param {JSON} packet
     * @param {Server} server
     */
    readPacket(): void;
}
