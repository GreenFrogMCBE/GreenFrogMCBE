/** This file contains API functions for the world. */

const UpdateBlock = require("../network/packets/ServerUpdateBlockPacket");

const WorldGenerator = require("../network/packets/types/WorldGenerator");
const DamageCause = require("../type/health/DamageCause");
const GameMode = require("../api/player/GameMode");

const Logger = require("../server/Logger");

const PlayerInfo = require("../api/PlayerInfo");

const Frog = require("../Frog");

/**
 * The world time.
 * 
 * @private
 */
let _time = 0;

class World {
	constructor() {
		/**
		 * The name of the world.
		 * @type {String}
		 */
		this.worldName;

		/**
		 * The coordinates of the spawn point.
		 * @type {{ x: Number, y: Number, z: Number }}
		 */
		this.coords = {};

		/**
		 * The chunk render radius.
		 * @type {Number}
		 */
		this.renderDistance;
	}

	/**
	 * Sets the name of the world.
	 * @param {String} name - The new name of the world.
	 */
	setName(name) {
		this.worldName = name;
	}

	/**
	 * Gets the name of the world.
	 * @returns {String} - The name of the world.
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
	 * @param {Number} x - The x-coordinate of the spawn point.
	 * @param {Number} y - The y-coordinate of the spawn point.
	 * @param {Number} z - The z-coordinate of the spawn point.
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
	 * @param {Number} radius - The new chunk render radius.
	 */
	setChunkRadius(radius) {
		this.renderDistance = radius;
	}

	/**
	 * Gets the chunk render radius.
	 * @returns {Number} - The chunk render radius.
	 */
	getChunkRadius() {
		return this.renderDistance;
	}

	/**
	 * Places a block at the specified coordinates.
	 * @param {Number} x - The x-coordinate of the block.
	 * @param {Number} y - The y-coordinate of the block.
	 * @param {Number} z - The z-coordinate of the block.
	 * @param {Number} id - The ID of the block to place.
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

		if (config.tickEvent) {
			Frog.eventEmitter.emit('serverTick', {
				world: this.getWorldData(),
				server: Frog.server,
				cancel() { return false }
			});
		}

		if (config.tickWorldTime) {
			Frog.eventEmitter.emit('serverTimeTick', {
				world: this.getWorldData(),
				server: Frog.server,
				time: _time,
				cancel() { return false }
			});

			_time += 10;
			for (const player of this.getPlayersInWorld()) {
				if (!player.offline) {
					player.setTime(_time);
				}
			}
		}

		if (config.tickRegeneration) {
			Frog.eventEmitter.emit('serverRegenerationTick', {
				world: this.getWorldData(),
				server: Frog.server,
				cancel() { return false }
			});

			for (const player of this.getPlayersInWorld()) {
				if (player.health > 20 || player.hunger < 20 || player.offline || player.gamemode === GameMode.CREATIVE || player.gamemode === GameMode.SPECTATOR) {
					Logger.debug("Skipped regeneration task for " + player.username);
				} else {
					player.setHealth(player.health + 1, DamageCause.REGENERATION);
				}
			}
		}

		if (config.tickStarvationDamage) {
			Frog.eventEmitter.emit('serverStarvationDamageTick', {
				world: this.getWorldData(),
				server: Frog.server,
				cancel() { return false }
			});

			for (const player of this.getPlayersInWorld()) {
				if (player.hunger <= 0) {
					player.setHealth(player.health - 1, DamageCause.STARVATION);
				}
			}
		}

		if (config.tickVoid) {
			Frog.eventEmitter.emit('serverVoidDamageTick', {
				world: this.getWorldData(),
				server: Frog.server,
				cancel() { return false }
			});

			for (const client of this.getPlayersInWorld()) {
				const posY = Math.floor(client.y);

				let min = -64;

				if (config.generator === WorldGenerator.VOID) {
					min = NaN;
				}

				if (posY <= min) {
					if (client.gamemode === GameMode.CREATIVE || client.gamemode === GameMode.SPECTATOR) {
						if (client.damageLoop) {
							delete client.damageLoop;
						}
					} else if (!client.cannotbedamagedbyvoid) {
						client.setHealth(client.health - 5, DamageCause.VOID);
					}
				} else {
					if (client.damageLoop) {
						delete client.damageLoop;
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