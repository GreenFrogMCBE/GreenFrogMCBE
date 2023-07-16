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
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const ServerUpdateBlockPacket = require("../network/packets/ServerUpdateBlockPacket");

const WorldGenerator = require("./types/WorldGenerator");
const DamageCause = require("../api/health/DamageCause");
const Gamemode = require("../api/player/Gamemode");

const PlayerInfo = require("../api/player/PlayerInfo");

const vanillaBlocks = require("../api/block/vanillaBlocks.json");

const Frog = require("../Frog");

let time = 0;

class World {
	constructor() {
		/**
		 * @type {string}
		 */
		this.worldName;

		/**
		 * The coordinates of the spawn point.
		 *
		 * @type {import('../declarations/Typedefs').Coordinate}
		 */
		this.spawnCoordinates;

		/**
		 * @type {number}
		 */
		this.renderDistance;

		/**
		 * @type {import('./types/WorldGenerator')}
		 */
		this.generator;

		/**
		 * @type {number}
		 */
		this.time = time;
	}

	/**
	 * @param {number} x - The X-coordinate of the block.
	 * @param {number} y - The Y-coordinate of the block.
	 * @param {number} z - The Z-coordinate of the block.
	 * @param {number} id - The runtime ID of the block to place.
	 */
	placeBlock(x, y, z, id) {
		for (const player of PlayerInfo.players) {
			const updateBlockPacket = new ServerUpdateBlockPacket();
			updateBlockPacket.block_runtime_id = id;
			updateBlockPacket.x = x;
			updateBlockPacket.y = y;
			updateBlockPacket.z = z;
			updateBlockPacket.neighbors = true;
			updateBlockPacket.network = true;
			updateBlockPacket.flags_value = 3;
			updateBlockPacket.writePacket(player);
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
		this.placeBlock(x, y, z, vanillaBlocks.air.runtime_id);
	}

	/**
	 * Ticks the world
	 */
	tick() {
		if (!PlayerInfo.players.length) return;

		const config = Frog.config;

		if (config.world.tickEvent) Frog.eventEmitter.emit("serverTick", { world: this.getWorldData() });

		if (config.world.tickWorldTime) {
			time = time + 10;

			Frog.eventEmitter.emit("serverTimeTick", { world: this.getWorldData() });

			for (const player of PlayerInfo.players) {
				if (!player.offline) player.setTime(time);
			}
		}

		if (config.world.tickRegeneration) {
			Frog.eventEmitter.emit("serverRegenerationTick", { world: this.getWorldData() });

			for (const player of PlayerInfo.players) {
				if (!(player.health > 20 || player.hunger < 20 || player.offline || player.gamemode === Gamemode.CREATIVE || player.gamemode === Gamemode.SPECTATOR)) {
					player.setHealth(player.health + 1, DamageCause.REGENERATION);
				}
			}
		}

		if (config.world.tickStarvationDamage) {
			Frog.eventEmitter.emit("serverStarvationDamageTick", { world: this.getWorldData() });

			for (const player of PlayerInfo.players) {
				if (player.hunger <= 0) {
					player.setHealth(player.health - 1, DamageCause.STARVATION);
				}
			}
		}

		if (config.world.tickVoid) {
			Frog.eventEmitter.emit("serverVoidDamageTick", { world: this.getWorldData() });

			for (const client of PlayerInfo.players) {
				const posY = Math.floor(client.location.y);

				let min = -62;

				if (config.world.generator === WorldGenerator.VOID) {
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
	 * @returns {import("../declarations/Typedefs").WorldData}
	 */
	getWorldData() {
		return {
			name: this.worldName,
			chunk_radius: this.renderDistance,
			spawn_coordinates: this.coordinates,
			generator: this.generator,
			time: time,
		};
	}
}

module.exports = World;
