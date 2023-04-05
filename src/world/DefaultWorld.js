/** This file contains default functions for the world */

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
const { config, lang } = require("../api/ServerInfo");

const UpdateBlock = require("../network/packets/ServerUpdateBlockPacket");

const WorldGenerator = require("../network/packets/types/WorldGenerator");
const DamageCause = require("../events/types/DamageCause");

const GameMode = require("../api/GameMode");

const Logger = require("../server/Logger");

const PlayerInfo = require("../api/PlayerInfo");
const Frog = require("../Frog");

/**
 * The world time
 * TODO: Please replace this with something better
 * 
 * @private
 */
let _time = 0;

class DefaultWorld {
	constructor() {
		/** World name */
		this.worldName;
		/** Spawn coordinates */
		this.coords = {};
		/** Chunk render radius */
		this.renderDistance;
	}

	/**
	 * Sets the world name
	 * @param {String} name
	 */
	setName(name) {
		this.worldName = name;
	}

	/**
	 * Returns the world name
	 * @returns The world name
	 */
	getName() {
		return this.worldName;
	}

	/**
	 * Returns the players that are in the world right now
	 * @returns Players in world
	 */
	getPlayersInWorld() {
		return PlayerInfo.players;
	}

	/**
	 * Sets the coordinates for the world spawn
	 * @param {Float} x
	 * @param {Float} y
	 * @param {Float} z
	 */
	setSpawnCoordinates(x, y, z) {
		this.coords = {
			x,
			y,
			z,
		};
	}

	/**
	 * Returns the spawn coordinates
	 */
	getSpawnCoordinates() {
		return this.coords;
	}

	/**
	 * Sets the chunk radius
	 * @param {Number} radius
	 */
	setChunkRadius(radius) {
		this.renderDistance = radius;
	}

	/**
	 * Returns the chunk radius
	 */
	getChunkRadius() {
		return this.renderDistance;
	}

	/**
	 * Places block at specified coordinates
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 * @param {Number} id
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
	 * @private
	 */
	tick() {
		try {
			if (config.tickEvent) {
				Frog.eventEmitter.emit('serverTickEvent', {
					world: this.toJSON(),
					server: require("../Server"),
					cancel() { return false }
				});
			}

			if (config.tickWorldTime) {
				Frog.eventEmitter.emit('serverTimeTickEvent', {
					world: this.toJSON(),
					server: require("../Server"),
					time: _time,
					cancel() { return false }
				});

				_time = _time + 10;
				for (const player of this.getPlayersInWorld()) {
					if (!player.offline) player.setTime(_time);
				}
			}

			if (config.tickRegeneration) {
				Frog.eventEmitter.emit('serverRegenerationTickEvent', {
					world: this.toJSON(),
					server: require("../Server"),
					cancel() { return false }
				});

				for (const player of this.getPlayersInWorld()) {
					if (player.health > 20 || player.hunger < 20 || player.offline || player.gamemode == GameMode.CREATIVE || player.gamemode == GameMode.SPECTATOR) {
						Logger.debug("Skipped regeneration task for " + player.username);
					} else {
						player.setHealth(player.health + 1, DamageCause.REGENERATION);
					}
				}
			}

			if (config.tickStarvationDamage) {
				Frog.eventEmitter.emit('serverStarvationDamageTickEvent', {
					world: this.toJSON(),
					server: require("../Server"),
					cancel() { return false }
				});

				for (const player of this.getPlayersInWorld()) {
					if (player.hunger <= 0) {
						player.setHealth(player.health - 1, DamageCause.STARVATION);
					}
				}
			}

			if (config.tickVoid) {
				Frog.eventEmitter.emit('serverVoidDamageTickEvent', {
					world: this.toJSON(),
					server: require("../Server"),
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
							if (client.damage_loop) delete client.damage_loop;
						} else if (!client.cannotbedamagedbyvoid) {
							client.setHealth(client.health - 5, DamageCause.VOID);
						}
					} else {
						if (client.damage_loop) delete client.damage_loop;
					}
				}
			}
		} catch (e) {
			Logger.error(lang.errors.errorTickingWorld.replace("%e.stack%", e.stack));
		}
	}

	toJSON() {
		return {
			name: this.worldName,
			chunk_radius: this.renderDistance,
			spawn_coordinates: this.coords,
		};
	}
}

module.exports = DefaultWorld;
