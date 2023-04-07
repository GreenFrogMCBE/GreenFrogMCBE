export = ServerStartGamePacket;
declare class ServerStartGamePacket extends PacketConstructor {
    /**
     * Sets the entity ID
     * @param {Number} new_entity_id - The entity ID
     */
    setEntityId(new_entity_id: number): void;
    /**
     * Sets the runtime entity ID
     * @param {Number} new_runtime_entity_id - The runtime entity ID
     */
    setRunTimeEntityId(new_runtime_entity_id: number): void;
    /**
     * Sets the gamemode
     * @param {Gamemode} new_gamemode - The gamemode
     */
    setGamemode(new_gamemode: typeof Gamemode): void;
    /**
     * Sets the player spawn position X, Y, and Z
     * @param {Number} x - The player X
     * @param {Number} y - The player Y
     * @param {Number} z - The player Z
     */
    setPlayerPosition(x: number, y: number, z: number): void;
    /**
     * Sets the player rotation X and Z
     * @param {Number} x - The player rotation (X)
     * @param {Number} z - The player rotation (Z)
     */
    setPlayerRotation(x: number, z: number): void;
    /**
     * Sets the seed
     * @param {Array<Number>} new_seed - The seed (contains 2 numbers: example: [0, 0])
     */
    setSeed(new_seed: Array<number>): void;
    /**
     * Sets the biome type
     * @param {String} new_biome_type - The biome type
     */
    setBiomeType(new_biome_type: string): void;
    /**
     * Sets the biome name
     * @param {Biomes} new_biome_name - The biome name
     */
    setBiomeName(new_biome_name: Biomes): void;
    /**
     * Sets the dimension
     * @param {Dimension} new_dimension - The dimension
     */
    setDimension(new_dimension: {
        OVERWORLD: string;
        NETHER: string;
        END: string;
    }): void;
    /**
     * Sets the generator
     * @param {Generator} new_generator - The generator
     */
    setGenerator(new_generator: {
        OLD: number;
        INFINITE: number;
        FLAT: number;
        NETHER: number;
        END: number;
    }): void;
    /**
     * Sets the world gamemode
     * @param {Gamemode} new_world_gamemode - The world gamemode
     */
    setWorldGamemode(new_world_gamemode: typeof Gamemode): void;
    /**
     * Sets the difficulty
     * @param {Difficulty} new_difficulty - The difficulty
     */
    setDifficulty(new_difficulty: typeof Difficulty): void;
    /**
     * Sets the spawn position X, Y, and Z
     * @param {Number} x - The spawn X
     * @param {Number} y - The spawn Y
     * @param {Number} z - The spawn Z
     */
    setSpawnPosition(x: number, y: number, z: number): void;
    /**
     * Sets the spawn position
     * @param {Number} new_permission_level - The permission level
     */
    setPlayerPermissionLevel(new_permission_level: number): void;
    /**
     * Sets the world name
     * @param {String} worldname
     */
    setWorldName(new_worldname: any): void;
    /**
     * Returns the spawn position
     * @returns {Number} - The permission level
     */
    getPlayerPermissionLevel(): number;
    /**
     * Returns the entity id
     * @returns {Number} - The entity id
     */
    getEntityId(): number;
    /**
     * Returns the runtime entity id
     * @returns {Number} - The runtime entity id
     */
    getRunTimeEntityId(): number;
    /**
     * Returns the gamemode
     * @returns {Gamemode} - The gamemode
     */
    getGamemode(): typeof Gamemode;
    /**
     * Returns the player spawn position X, Y, and Z
     * @returns {Number} - The player X
     * @returns {Number} - The player Y
     * @returns {Number} - The player Z
     */
    getPlayerPosition(): number;
    /**
     * Returns the player rotation X and Z
     * @returns {Number} - The player rotation X
     * @returns {Number} - The player rotation Z
     */
    getPlayerRotation(): number;
    /**
     * Returns the seed
     * @returns {Array<NumbeR>} - The seed
     */
    getSeed(): Array<NumbeR>;
    /**
     * Returns the biome type
     * @returns {Biomes} - The biome type
     */
    getBiomeType(): Biomes;
    /**
     * Returns the biome name
     * @returns {String} - The biome name
     */
    getBiomeName(): string;
    /**
     * Returns the dimension
     * @returns {Dimension} - The dimension
     */
    getDimension(): {
        OVERWORLD: string;
        NETHER: string;
        END: string;
    };
    /**
     * Returns the generator
     * @returns {Generator} - The generator
     */
    getGenerator(): {
        OLD: number;
        INFINITE: number;
        FLAT: number;
        NETHER: number;
        END: number;
    };
    /**
     * Returns the world gamemode
     * @returns {Gamemode} - The world gamemode
     */
    getWorldGamemode(): typeof Gamemode;
    /**
     * Returns the difficulty
     * @returns {Difficulty} - The difficulty
     */
    getDifficulty(): typeof Difficulty;
    /**
     * Returns the spawn position as JSON
     * @returns The spawn position as JSON
     */
    getSpawnPosition(): {
        x: number;
        y: number;
        z: number;
    };
    /**
     * Returns the world name
     * @returns The world name
     */
    getWorldName(): string;
    /**
     * Sends the packet to the client
     * @param {any} client
     */
    writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");
import Gamemode = require("../../api/GameMode");
import Difficulty = require("./types/Difficulty");
