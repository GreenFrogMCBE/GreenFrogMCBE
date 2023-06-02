export = ServerSetDifficultyPacket;
declare class ServerSetDifficultyPacket extends PacketConstructor {
    /**
     * Sets the difficulty
     * @param {Difficulty} new_difficulty
     */
    setDifficulty(new_difficulty: {
        readonly PEACEFUL: "peaceful";
        readonly EASY: "easy";
        readonly NORMAL: "normal";
        readonly HARD: "hard";
    }): void;
    /**
     * Returns the difficulty
     * @returns {Difficulty}
     */
    getDifficulty(): {
        readonly PEACEFUL: "peaceful";
        readonly EASY: "easy";
        readonly NORMAL: "normal";
        readonly HARD: "hard";
    };
    /**
     * Sends the packet to the client
     * @param {Client} client
     */
    writePacket(client: Client): void;
}
import PacketConstructor = require("./PacketConstructor");
