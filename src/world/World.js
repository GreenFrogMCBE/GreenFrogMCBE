/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const UpdateBlock = require("../network/packets/ServerUpdateBlockPacket");

const WorldGenerators = require("./types/WorldGenerators");
const DamageCause = require("../api/health/DamageCause");
const Gamemode = require("../api/player/Gamemode");

const PlayerInfo = require("../api/player/PlayerInfo");

const Air = require("../block/blockUpdate/Air");

const Frog = require("../Frog");

/** @private */
let time = 0;

class World {
	constructor() {
		/**
		 * The name of the world.
		 *
		 * @type {string}
		 */
		this.worldName;

		/**
		 * The coordinates of the spawn point.
		 *
		 * @type {{ x: number, y: number, z: number }}
		 */
		this.coords = {};

		/**
		 * The chunk render radius.
		 *
		 * @type {number}
		 */
		this.renderDistance;

		/**
		 * The world generator
		 *
		 * @type {import('./types/WorldGenerators')}
		 */
		this.generator;
	}

	/**
	 * Sets the name of the world.
	 *
	 * @param {string} name - The new name of the world.
	 */
	setName(name) {
		this.worldName = name;
	}

	/**
	 * Sets the world generator
	 *
	 * @param {import('./types/WorldGenerators')} generator
	 */
	setGenerator(generator) {
		this.generator = generator;
	}

	/**
	 * Returns the name of the world.
	 *
	 * @returns {string} - The name of the world.
	 */
	getName() {
		return this.worldName;
	}

	/**
	 * Returns the world generator
	 *
	 * @returns {import('./types/WorldGenerator')}
	 */
	getGenerator() {
		return this.generator;
	}

	/**
	 * Returns the players that are currently in the world.
	 *
	 * @returns {Array<Player>} - The players in the world.
	 */
	getPlayersInWorld() {
		return PlayerInfo.players;
	}

	/**
	 * Sets the coordinates of the spawn point.
	 *
	 * @param {number} x - The x-coordinate of the spawn point.
	 * @param {number} y - The y-coordinate of the spawn point.
	 * @param {number} z - The z-coordinate of the spawn point.
	 */
	setSpawnCoordinates(x, y, z) {
		this.coords = { x, y, z };
	}

	/**
	 * Returns the coordinates of the spawn point.
	 *
	 * @returns {{ x: number, y: number, z: number }} - The coordinates of the spawn point.
	 */
	ReturnspawnCoordinates() {
		return this.coords;
	}

	/**
	 * Sets the chunk render radius.
	 *
	 * @param {number} radius - The new chunk render radius.
	 */
	setChunkRadius(radius) {
		this.renderDistance = radius;
	}

	/**
	 * Returns the chunk render radius.
	 *
	 * @returns {number} - The chunk render radius.
	 */
	getChunkRadius() {
		return this.renderDistance;
	}

	/**
	 * Sets the world time
	 *
	 * @param {number} new_time
	 */
	setTime(new_time) {
		time = new_time;
	}

	/**
	 * Returns the world time
	 *
	 * @return {number}
	 */
	getTime() {
		return time;
	}

	/**
	 * Places a block at the specified coordinates.
	 *
	 * @param {number} x - The X-coordinate of the block.
	 * @param {number} y - The Y-coordinate of the block.
	 * @param {number} z - The Z-coordinate of the block.
	 * @param {number} id - The ID of the block to place.
	 */
	placeBlock(x, y, z, id) {
		for (const player of this.getPlayersInWorld()) {
			const updateblock = new UpdateBlock();
			updateblock.setBlockRuntimeId(id);
			updateblock.setX(x);
			updateblock.setY(y);
			updateblock.setZ(z);
			updateblock.setNeighbors(true);
			updateblock.setNetwork(true);
			updateblock.setFlagsValue(3);
			updateblock.writePacket(player);
		}
	}

	/**
	 * Breaks a block at the specified coordinates.
	 *
	 * @param {number} x - The X-coordinate of the block.
	 * @param {number} y - The Y-coordinate of the block.
	 * @param {number} z - The Z-coordinate of the block.
	 */
	breakBlock(x, y, z) {
		this.placeBlock(x, y, z, new Air().getRuntimeID());
	}

	/**
	 * Ticks the world
	 */
	tick() {
		const { config } = Frog.serverConfigurationFiles;

		if (config.world.tickEvent) {
			Frog.eventEmitter.emit("serverTick", {
				world: this.getWorldData(),
				server: require("../Server"),
			});
		}

		if (config.world.tickWorldTime) {
			this.setTime(this.getTime() + 10);

			Frog.eventEmitter.emit("serverTimeTick", {
				world: this.getWorldData(),
				server: require("../Server"),
				time: this.getTime(),
			});

			for (const player of this.getPlayersInWorld()) {
				if (!player.offline) {
					player.setTime(this.getTime());
				}
			}
		}

		if (config.world.tickRegeneration) {
			Frog.eventEmitter.emit("serverRegenerationTick", {
				world: this.getWorldData(),
				server: require("../Server"),
			});

			for (const player of this.getPlayersInWorld()) {
				if (!(player.health > 20 || player.hunger < 20 || player.offline || player.gamemode === Gamemode.CREATIVE || player.gamemode === Gamemode.SPECTATOR)) {
					player.setHealth(player.health + 1, DamageCause.REGENERATION);
				}
			}
		}

		if (config.world.tickStarvationDamage) {
			Frog.eventEmitter.emit("serverStarvationDamageTick", {
				world: this.getWorldData(),
				server: require("../Server"),
			});

			for (const player of this.getPlayersInWorld()) {
				if (player.hunger <= 0) {
					player.setHealth(player.health - 1, DamageCause.STARVATION);
				}
			}
		}

		if (config.world.tickVoid) {
			Frog.eventEmitter.emit("serverVoidDamageTick", {
				world: this.getWorldData(),
				server: require("../Server"),
			});

			for (const client of this.getPlayersInWorld()) {
				const posY = Math.floor(client.location.y);

				let min = -62;

				if (config.world.generator === WorldGenerators.VOID) {
					min = undefined;
				}

				if (posY <= min) {
					if (client.gamemode === Gamemode.CREATIVE || client.gamemode === Gamemode.SPECTATOR) {
						client.cannotBeDamagedByVoid = true;
					} else {
						client.cannotBeDamagedByVoid = false;
					}

					if (!client.cannotBeDamagedByVoid && !client.dead) {
						client.setHealth(client.health - 6, DamageCause.VOID);
					}
				}
			}
		}
	}

	/**
	 * Returns world data.
	 *
	 * @returns {{ name: string, chunk_radius: number, spawn_coordinates: { x: number, y: number, z: number } }} An object containing the world's name, chunk radius, and spawn coordinates.
	 */
	getWorldData() {
		return {
			name: this.worldName,
			chunk_radius: this.renderDistance,
			spawn_coordinates: this.coords,
			generator: this.generator,
		};
	}
}

module.exports = World;
