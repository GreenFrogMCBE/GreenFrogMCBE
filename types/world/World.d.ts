export = World;
declare class World {
    /**
     * @type {string}
     */
    worldName: string;
    /**
     * The coordinates of the spawn point.
     *
     * @type {{ x: number, y: number, z: number }}
     */
    spawnCoordinates: {
        x: number;
        y: number;
        z: number;
    };
    /**
     * @type {number}
     */
    renderDistance: number;
    /**
     * @type {import('./types/WorldGenerator')}
     */
    generator: {
        readonly FLAT: "Flat";
        readonly DEFAULT: "Default";
        readonly VOID: "Void";
    };
    /**
     * @type {number}
     */
    time: number;
    /**
     * @param {number} x - The X-coordinate of the block.
     * @param {number} y - The Y-coordinate of the block.
     * @param {number} z - The Z-coordinate of the block.
     * @param {number} id - The runtime ID of the block to place.
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
