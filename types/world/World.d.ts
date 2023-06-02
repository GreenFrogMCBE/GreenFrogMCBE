export = World;
declare class World {
    /**
     * The name of the world.
     *
     * @type {string}
     */
    worldName: string;
    /**
     * The coordinates of the spawn point.
     *
     * @type {{ x: number, y: number, z: number }}
     */
    coords: {
        x: number;
        y: number;
        z: number;
    };
    /**
     * The chunk render radius.
     *
     * @type {number}
     */
    renderDistance: number;
    /**
     * The world generator
     *
     * @type {import('./types/WorldGenerators')}
     */
    generator: {
        readonly FLAT: "Flat";
        readonly DEFAULT: "Default";
        readonly VOID: "Void";
    };
    /**
     * Sets the name of the world.
     *
     * @param {string} name - The new name of the world.
     */
    setName(name: string): void;
    /**
     * Sets the world generator
     *
     * @param {import('./types/WorldGenerators')} generator
     */
    setGenerator(generator: {
        readonly FLAT: "Flat";
        readonly DEFAULT: "Default";
        readonly VOID: "Void";
    }): void;
    /**
     * Returns the name of the world.
     *
     * @returns {string} - The name of the world.
     */
    getName(): string;
    /**
     * Returns the world generator
     *
     * @returns {import('./types/WorldGenerator')}
     */
    getGenerator(): any;
    /**
     * Returns the players that are currently in the world.
     *
     * @returns {Array<Player>} - The players in the world.
     */
    getPlayersInWorld(): Array<Player>;
    /**
     * Sets the coordinates of the spawn point.
     *
     * @param {number} x - The x-coordinate of the spawn point.
     * @param {number} y - The y-coordinate of the spawn point.
     * @param {number} z - The z-coordinate of the spawn point.
     */
    setSpawnCoordinates(x: number, y: number, z: number): void;
    /**
     * Returns the coordinates of the spawn point.
     *
     * @returns {{ x: number, y: number, z: number }} - The coordinates of the spawn point.
     */
    ReturnspawnCoordinates(): {
        x: number;
        y: number;
        z: number;
    };
    /**
     * Sets the chunk render radius.
     *
     * @param {number} radius - The new chunk render radius.
     */
    setChunkRadius(radius: number): void;
    /**
     * Returns the chunk render radius.
     *
     * @returns {number} - The chunk render radius.
     */
    getChunkRadius(): number;
    /**
     * Sets the world time
     *
     * @param {number} new_time
     */
    setTime(new_time: number): void;
    /**
     * Returns the world time
     *
     * @return {number}
     */
    getTime(): number;
    /**
     * Places a block at the specified coordinates.
     *
     * @param {number} x - The X-coordinate of the block.
     * @param {number} y - The Y-coordinate of the block.
     * @param {number} z - The Z-coordinate of the block.
     * @param {number} id - The ID of the block to place.
     */
    placeBlock(x: number, y: number, z: number, id: number): void;
    /**
     * Breaks a block at the specified coordinates.
     *
     * @param {number} x - The X-coordinate of the block.
     * @param {number} y - The Y-coordinate of the block.
     * @param {number} z - The Z-coordinate of the block.
     */
    breakBlock(x: number, y: number, z: number): void;
    /**
     * Ticks the world
     */
    tick(): void;
    /**
     * Returns world data.
     *
     * @returns {{ name: string, chunk_radius: number, spawn_coordinates: { x: number, y: number, z: number } }} An object containing the world's name, chunk radius, and spawn coordinates.
     */
    getWorldData(): {
        name: string;
        chunk_radius: number;
        spawn_coordinates: {
            x: number;
            y: number;
            z: number;
        };
    };
}
