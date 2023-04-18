/** This file contains API functions for the world. */

const UpdateBlock = require("../network/packets/ServerUpdateBlockPacket");

const FrogWorldGenerators = require("../network/packets/types/FrogWorldGenerators");
const DamageCause = require("../api/health/DamageCause");
const GameMode = require("../api/player/GameMode");

const PlayerInfo = require("../api/player/PlayerInfo");

const Frog = require("../Frog");

/** @private */
let _time = 0;

class World {
	constructor() {
		/**
		 * The name of the world.
		 * @type {string}
		 */
		this.worldName;

		/**
		 * The coordinates of the spawn point.
		 * @type {{ x: Number, y: Number, z: Number }}
		 */
		this.coords = {};

		/**
		 * The chunk render radius.
		 * @type {number}
		 */
		this.renderDistance;
	}

	/**
	 * Sets the name of the world.
	 * @param {string} name - The new name of the world.
	 */
	setName(name) {
		this.worldName = name;
	}

	/**
	 * Gets the name of the world.
	 * @returns {string} - The name of the world.
	 */
	getName() {
		return this.worldName;
	}

	/**
	 * Gets the players that are currently in the world.
	 * @returns {Array<Player>} - The players in the world.
	 */
	getPlayersInWorld() {
		return PlayerInfo.players;
	}

	/**
	 * Sets the coordinates of the spawn point.
	 * @param {number} x - The x-coordinate of the spawn point.
	 * @param {number} y - The y-coordinate of the spawn point.
	 * @param {number} z - The z-coordinate of the spawn point.
	 */
	setSpawnCoordinates(x, y, z) {
		this.coords = { x, y, z };
	}

	/**
	 * Gets the coordinates of the spawn point.
	 * @returns {{ x: Number, y: Number, z: Number }} - The coordinates of the spawn point.
	 */
	getSpawnCoordinates() {
		return this.coords;
	}

	/**
	 * Sets the chunk render radius.
	 * @param {number} radius - The new chunk render radius.
	 */
	setChunkRadius(radius) {
		this.renderDistance = radius;
	}

	/**
	 * Gets the chunk render radius.
	 * @returns {number} - The chunk render radius.
	 */
	getChunkRadius() {
		return this.renderDistance;
	}

	/**
	 * Places a block at the specified coordinates.
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
	 * Ticks the world
	 */
	tick() {
		const { config } = Frog.serverConfigurationFiles

		if (config.world.tickEvent) {
			Frog.eventEmitter.emit('serverTick', {
				world: this.getWorldData(),
				server: require("../Server")
			});
		}

		if (config.world.tickWorldTime) {
			Frog.eventEmitter.emit('serverTimeTick', {
				world: this.getWorldData(),
				server: require("../Server"),
				time: _time
			});

			_time += 10;
			for (const player of this.getPlayersInWorld()) {
				if (!player.offline) {
					player.setTime(_time);
				}
			}
		}

		if (config.world.tickRegeneration) {
			Frog.eventEmitter.emit('serverRegenerationTick', {
				world: this.getWorldData(),
				server: require("../Server")
			});

			for (const player of this.getPlayersInWorld()) {
				if (!(player.health > 20 || player.hunger < 20 || player.offline || player.gamemode === GameMode.CREATIVE || player.gamemode === GameMode.SPECTATOR)) {
					player.setHealth(player.health + 1, DamageCause.REGENERATION);
				}
			}
		}

		if (config.world.tickStarvationDamage) {
			Frog.eventEmitter.emit('serverStarvationDamageTick', {
				world: this.getWorldData(),
				server: require("../Server")
			});

			for (const player of this.getPlayersInWorld()) {
				if (player.hunger <= 0) {
					player.setHealth(player.health - 1, DamageCause.STARVATION);
				}
			}
		}

		if (config.world.tickVoid) {
			Frog.eventEmitter.emit('serverVoidDamageTick', {
				world: this.getWorldData(),
				server: require("../Server")
			});

			for (const client of this.getPlayersInWorld()) {
				const posY = Math.floor(client.y);

				let min = -64;

				if (config.world.generator === FrogWorldGenerators.VOID) {
					min = undefined;
				}

				if (posY <= min) {
					console.log(client.gamemode)

					if (client.gamemode === GameMode.CREATIVE || 
						client.gamemode === GameMode.SPECTATOR) {
						client.cannotBeDamagedByVoid = true
					} else {
						client.cannotBeDamagedByVoid = false
					}
					
					if (client.cannotBeDamagedByVoid && !client.dead) {
						client.setHealth(client.health - 6, DamageCause.VOID);
					}
				}
			}
		}
	}

	/**
	 * Returns world data.
	 *
	 * @returns {{ name: string, chunk_radius: Number, spawn_coordinates: { x: Number, y: Number, z: Number } }} An object containing the world's name, chunk radius, and spawn coordinates.
	 */
	getWorldData() {
		return {
			name: this.worldName,
			chunk_radius: this.renderDistance,
			spawn_coordinates: this.coords,
		};
	}
}

module.exports = World;