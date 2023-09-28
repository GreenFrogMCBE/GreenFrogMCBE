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
const ServerNetworkChunkPublisherUpdatePacket = require("../network/packets/ServerNetworkChunkPublisherUpdatePacket");
const ServerUpdateBlockPacket = require("../network/packets/ServerUpdateBlockPacket");

const DamageCause = require("../player/types/DamageCause");
const WorldGenerator = require("./types/WorldGenerator");
const Gamemode = require("../player/types/Gamemode");

const PlayerInfo = require("../player/PlayerInfo");

const Frog = require("../Frog");

let time = 0;

class World {
	/**
	 * @constructor
	 */
	constructor() {
		/**
		 * @type {string}
		 */
		this.name = "World";

		/**
		 * @type {import("Frog").Vec3}
		 */
		this.spawnCoordinates = { x: 0, y: 0, z: 0 };

		/**
		 * @type {number}
		 */
		this.renderDistance = 4;

		/**
		 * @type {import("Frog").WorldGenerator | undefined}
		 */
		this.generator;

		/**
		 * @type {number}
		 */
		this.time = time;
	}

	/**
	 * Places a block at the specified coordinates for all playersOnline.in the world.
	 *
	 * @param {number} x - The X-coordinate of the block.
	 * @param {number} y - The Y-coordinate of the block.
	 * @param {number} z - The Z-coordinate of the block.
	 * @param {number} id - The runtime ID of the block to place.
	 */
	placeBlock(x, y, z, id) {
		for (const player of PlayerInfo.playersOnline) {
			this.sendBlockUpdatePacket(player, x, y, z, id);
		}
	}

	/**
	 * Sends a block update packet to a specific player.
	 *
	 * @param {any} player - The player to send the block update packet to.
	 * @param {number} x - The X-coordinate of the block.
	 * @param {number} y - The Y-coordinate of the block.
	 * @param {number} z - The Z-coordinate of the block.
	 * @param {number} id - The runtime ID of the block to place.
	 */
	sendBlockUpdatePacket(player, x, y, z, id) {
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

	/**
	 * Breaks a block at the specified coordinates for all players in the world.
	 *
	 * @param {number} x - The X-coordinate of the block.
	 * @param {number} y - The Y-coordinate of the block.
	 * @param {number} z - The Z-coordinate of the block.
	 */
	breakBlock(x, y, z) {
		this.placeBlock(x, y, z, 0);
	}

	/**
	 * Ticks the world.
	 */
	tick() {
		if (!PlayerInfo.playersOnline.length) {
			return;
		}

		const tickingConfig = Frog.config.world.ticking;

		const tickingFunctions = [
			{ enabled: tickingConfig.event, function: this.tickEvent },
			{ enabled: tickingConfig.time, function: this.tickTime },
			{ enabled: tickingConfig.void, function: this.tickVoidDamage },
			{ enabled: tickingConfig.regeneration, function: this.tickRegeneration },
			{ enabled: tickingConfig.starvationDamage, function: this.tickStarvationDamage },
		];

		tickingFunctions.forEach((tickingFunction) => {
			if (tickingFunction.enabled) {
				tickingFunction.function();
			}
		});
	}

	/**
	 * Ticks hunger loss.
	 */
	startHungerLossLoop() {
		for (const player of PlayerInfo.playersOnline) {
			if (player.gamemode === Gamemode.CREATIVE || player.gamemode === Gamemode.SPECTATOR) {
				return;
			}

			player.setHunger(player.hunger - 0.5);
		}
	}

	/**
	 * Sends the network chunk publisher packet to all online players
	 */
	startNetworkChunkPublisherPacketSendingLoop() {
		setInterval(() => {
			const networkChunkPublisher = new ServerNetworkChunkPublisherUpdatePacket();
			networkChunkPublisher.coordinates = { x: 0, y: 0, z: 0 };
			networkChunkPublisher.radius = Frog.config.world.renderDistance.clientSide;
			networkChunkPublisher.saved_chunks = [];

			for (const player of PlayerInfo.playersOnline) {
				networkChunkPublisher.writePacket(player);
			}
		}, 4500);
	}

	/**
	 * Emits the server tick event.
	 */
	tickEvent = () => {
		this.emitServerEvent("serverTick");
	};

	/**
	 * Updates the world time
	 */
	tickTime = () => {
		time += 10;

		this.emitServerEvent("serverTimeTick");

		for (const player of PlayerInfo.playersOnline) {
			player.setTime(time);
		}
	};

	/**
	 * Performs regeneration on the player and emits the server regeneration tick event.
	 */
	tickRegeneration = () => {
		this.emitServerEvent("serverRegenerationTick");

		for (const player of PlayerInfo.playersOnline) {
			if (!(
				player.health > 20 ||
				player.hunger < 20 ||
				player.offline ||
				player.gamemode === Gamemode.CREATIVE ||
				player.gamemode === Gamemode.SPECTATOR
			)) {
				player.setHealth(player.health++, DamageCause.REGENERATION);
			}
		}
	};

	/**
	 * Performs starvation damage on the player and emits the server starvation damage tick event.
	 */
	tickStarvationDamage = () => {
		this.emitServerEvent("serverStarvationDamageTick");

		for (const player of PlayerInfo.playersOnline) {
			if (player.hunger <= 0) {
				player.setHealth(player.health--, DamageCause.STARVATION);
			}
		}
	};

	/**
	 * Performs void damage on players and emits the server void damage tick event.
	 */
	tickVoidDamage = () => {
		this.emitServerEvent("serverVoidDamageTick");

		for (const client of PlayerInfo.playersOnline) {
			const posY = Math.floor(client.location.y);

			let min = -65;

			if (Frog.config.world.generators.type === WorldGenerator.VOID) {
				min = undefined;
			}

			if (typeof min === "number" && posY <= min) {
				const invulnerable = 
					client.gamemode === Gamemode.CREATIVE || 
					client.gamemode === Gamemode.SPECTATOR;

				if (!invulnerable) {
					client.setHealth(client.health - 3, DamageCause.VOID);
				}
			}
		}
	};

	/**
	 * Calculates and handles fall damage.
	 * NOTE: This can be spoofed by a hacked client.
	 *
	 * @param {import("Frog").Player} player - The player object.
	 * @param {import("Frog").Vec3} position - The position where the fall occurred.
	 * @async
	 */
	async handleFallDamage(player, position) {
		if (
			player.gamemode !== Gamemode.CREATIVE &&
			player.gamemode !== Gamemode.SPECTATOR
		) {
			const fallDistanceY = player.location.y - position.y;

			if (
				fallDistanceY > 0.56 &&
				player._damage.fall.queue &&
				!player._damage.fall.invulnerable
			) {
				const damageAmount = Math.floor(player.health - player._damage.fall.queue);

				player.setHealth(damageAmount, DamageCause.FALL);

				player._damage.fall.invulnerable = true;
				player._damage.fall.queue = 0;

				setTimeout(() => {
					player._damage.fall.invulnerable = false;
				}, 50);
			}

			player._damage.fall.queue = (fallDistanceY + 0.5) * 2;
		}
	}

	/**
	 * Emits a world event
	 *
	 * @param {string} eventName - The name of the event to emit.
	 */
	emitServerEvent(eventName) {
		Frog.eventEmitter.emit(eventName, {
			world: this.getWorldData()
		});
	}

	/**
	 * Returns the world data.
	 *
	 * @returns {import("Frog").World}
	 */
	getWorldData() {
		return {
			name: this.name,
			renderDistance: this.renderDistance,
			spawnCoordinates: this.spawnCoordinates,
			generator: this.generator,
			time,
		};
	}
}

module.exports = World;
