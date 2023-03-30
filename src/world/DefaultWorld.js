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
const WorldGenerator = require("../network/packets/types/WorldGenerator");
const UpdateBlock = require("../network/packets/ServerUpdateBlockPacket");
const DamageCause = require("../events/types/DamageCause");

const ServerTickEvent = require("../events/ServerTickEvent");
const { config, lang } = require("../api/ServerInfo");
const PlayerInfo = require("../api/PlayerInfo");
const GameMode = require("../api/GameMode");

const Logger = require("../server/Logger");

let _time = 0;

class DefaultWorld {
	constructor() {
		this.name;
		this.cords = {};
		this.chunkRadius;
	}

	/**
	 * Sets the world name
	 * @param {String} name
	 */
	setName(name) {
		this.name = name;
	}

	/**
	 * Returns the world name
	 * @returns The world name
	 */
	getName() {
		return this.name;
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
		this.cords = {
			x,
			y,
			z,
		};
	}

	/**
	 * Returns the spawn coordinates
	 */
	getSpawnCoordinates() {
		return this.cords;
	}

	/**
	 * Sets the chunk radius
	 * @param {Number} radius
	 */
	setChunkRadius(radius) {
		this.chunkRadius = radius;
	}

	/**
	 * Returns the chunk radius
	 */
	getChunkRadius() {
		return this.chunkRadius;
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
				const serverTickEvent = new ServerTickEvent();
				serverTickEvent.world = this.toJSON();
				serverTickEvent.server = require("../Server");
				serverTickEvent.execute();
			}

			if (config.tickWorldTime) {
				_time = _time + 10;
				for (const player of this.getPlayersInWorld()) {
					if (!player.offline) player.setTime(_time);
				}
			}

			if (config.tickRegeneration) {
				for (const player of this.getPlayersInWorld()) {
					if (player.health > 20 || player.hunger < 20 || player.gamemode == GameMode.CREATIVE || player.gamemode == GameMode.SPECTATOR) {
						Logger.debug("Skipped regeneration task for " + player.username)
					} else {
						player.setHealth(player.health + 1, DamageCause.REGENERATION)
					}
				}
			}

			if (config.tickStarvationDamage) {
				for (const player of this.getPlayersInWorld()) {
					if (player.hunger <= 0) {
						player.setHealth(player.health - 1, DamageCause.STARVATION)
					}
				}
			}

			if (config.tickVoid) {
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
			name: this.name,
			chunk_radius: this.chunkRadius,
			spawn_coordinates: this.cords,
		};
	}
}

module.exports = DefaultWorld;
