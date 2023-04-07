export = PacketConstructor;
declare class PacketConstructor {
    getPacketName(): string;
    isCriticalPacket(): boolean;
    validatePacket(): void;
    writePacket(): void;
    readPacket(): void;
}
