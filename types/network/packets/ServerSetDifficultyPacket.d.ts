export = ServerSetDifficultyPacket;
declare class ServerSetDifficultyPacket extends PacketConstructor {
    /** @type {Difficulty} */
    difficulty: {
        readonly PEACEFUL: "peaceful";
        readonly EASY: "easy";
        readonly NORMAL: "normal";
        readonly HARD: "hard";
    };
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
