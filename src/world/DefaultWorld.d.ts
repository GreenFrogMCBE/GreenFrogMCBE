/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
export = DefaultWorld;
declare class DefaultWorld {
	name: string;
	cords: {
		x: any;
		y: any;
		z: any;
	};
	chunkRadius: number;
	/**
	 * Sets the world name
	 * @param {String} name
	 */
	setName(name: string): void;
	/**
	 * Returns the world name
	 * @returns The world name
	 */
	getName(): string;
	/**
	 * Returns the players that are in the world right now
	 * @returns Players in world
	 */
	getPlayersInWorld(): any[];
	/**
	 * Sets the coordinates for the world spawn
	 * @param {Int} x
	 * @param {Int} y
	 * @param {Int} z
	 */
	setSpawnCoordinates(x: Int, y: Int, z: Int): void;
	/**
	 * Returns the spawn coordinates
	 */
	getSpawnCoordinates(): {
		x: any;
		y: any;
		z: any;
	};
	/**
	 * Sets the chunk radius
	 * @param {Number} radius
	 */
	setChunkRadius(radius: number): void;
	/**
	 * Returns the chunk radius
	 */
	getChunkRadius(): number;
	/**
	 * Ticks the world
	 * @private
	 */
	private tick;
	toJSON(): {
		name: string;
		chunk_radius: number;
		spawn_coordinates: {
			x: any;
			y: any;
			z: any;
		};
	};
}
