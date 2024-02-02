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
const ServerNetworkChunkPublisherUpdatePacket = require("../network/packets/ServerNetworkChunkPublisherUpdatePacket")
const ServerMoveEntityDataPacket = require("../network/packets/ServerMoveEntityDataPacket")
const ServerRemoveEntityPacket = require("../network/packets/ServerRemoveEntityPacket")
const ServerUpdateBlockPacket = require("../network/packets/ServerUpdateBlockPacket")
const ServerAddEntityPacket = require("../network/packets/ServerAddEntityPacket")

const DamageCause = require("../player/types/DamageCause")
const WorldGenerator = require("./types/WorldGenerator")
const Gamemode = require("../player/types/Gamemode")

const entityAttributes = require("../../src/resources/json/entityAttributes.json")
const entityMetadata = require("../../src/resources/json/entityMetadata.json")

const entity = require("../entity/EntityModule").getModule()

const PlayerInfo = require("../player/PlayerInfo")

const Frog = require("../Frog")

const vm = require("vm")

let time = 0

class World {
	/**
	 * @constructor
	 */
	constructor() {
		/**
		 * @type {string}
		 */
		this.name = "World"

		/**
		 * @type {import("Frog").Vec3}
		 */
		this.spawnCoordinates = { x: 0, y: 0, z: 0 }

		/**
		 * @type {number}
		 */
		this.render_distance = 4

		/**
		 * @type {import("Frog").WorldGenerator}
		 */
		this.generator = WorldGenerator.DEFAULT

		/**
		 * @type {number}
		 */
		this.time = time
	}

	/**
	 * Places a block at the specified coordinates for all players_online.in the world.
	 *
	 * @param {number} x - The X-coordinate of the block.
	 * @param {number} y - The Y-coordinate of the block.
	 * @param {number} z - The Z-coordinate of the block.
	 * @param {number} id - The runtime ID of the block to place.
	 */
	place_block(x, y, z, id) {
		for (const player of PlayerInfo.players_online) {
			this.send_block_update_packet(player, x, y, z, id)
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
	send_block_update_packet(player, x, y, z, id) {
		const update_block_packet = new ServerUpdateBlockPacket()
		update_block_packet.block_runtime_id = id
		update_block_packet.x = x
		update_block_packet.y = y
		update_block_packet.z = z
		update_block_packet.neighbors = true
		update_block_packet.network = true
		update_block_packet.flags_value = 3
		update_block_packet.write_packet(player)
	}

	/**
	 * Breaks a block at the specified coordinates for all players in the world.
	 *
	 * @param {number} x - The X-coordinate of the block.
	 * @param {number} y - The Y-coordinate of the block.
	 * @param {number} z - The Z-coordinate of the block.
	 */
	break_block(x, y, z) {
		this.place_block(x, y, z, 0)
	}

	/**
	 * Ticks the world.
	 */
	tick() {
		if (!PlayerInfo.players_online.length) {
			return
		}

		const ticking_config = Frog.config.world.ticking

		const ticking_functions = [
			{ enabled: ticking_config.event, function: this.tickEvent },
			{ enabled: ticking_config.time, function: this.tick_time },
			{ enabled: ticking_config.void, function: this.tick_void_damage },
			{ enabled: ticking_config.regeneration, function: this.tick_regeneration },
			{ enabled: ticking_config.starvationDamage, function: this.tick_starvation_damage },
			{ enabled: ticking_config.entities, function: this.tickEntities }
		]

		ticking_functions.forEach((ticking_function) => {
			if (ticking_function.enabled) {
				ticking_function.function()
			}
		})
	}

	/**
	 * Ticks hunger loss.
	 */
	tick_hunfer_loss() {
		for (const player of PlayerInfo.players_online) {
			if (player.gamemode === Gamemode.CREATIVE || player.gamemode === Gamemode.SPECTATOR) {
				return
			}

			player.setHunger(player.hunger - 0.5)
		}
	}

	/**
	 * Sends the network chunk publisher packet to all online players
	 */
	start_network_chunk_publisher_packet_sending_loop() {
		setInterval(() => {
			const network_chunk_publisher = new ServerNetworkChunkPublisherUpdatePacket()
			network_chunk_publisher.coordinates = { x: 0, y: 0, z: 0 }
			network_chunk_publisher.radius = Frog.config.world.render_distance.client_side
			network_chunk_publisher.saved_chunks = []

			for (const player of PlayerInfo.players_online) {
				network_chunk_publisher.write_packet(player)
			}
		}, 4500)
	}

	/**
	 * Emits the server tick event.
	 */
	tickEvent = () => {
		this.emit_event("serverTick")
	}

	/**
	 * Ticks the world time
	 */
	tick_time = () => {
		time += 10

		for (const player of PlayerInfo.players_online) {
			player.setTime(time)
		}
	}

	/**
	 * Performs regeneration on the player.
	 */
	tick_regeneration = () => {
		for (const player of PlayerInfo.players_online) {
			if (!(
				player.health > 20 ||
				player.hunger < 20 ||
				player.offline ||
				player.gamemode === Gamemode.CREATIVE ||
				player.gamemode === Gamemode.SPECTATOR
			)) {
				player.set_health(player.health++, DamageCause.REGENERATION)
			}
		}
	}

	/**
	 * Performs starvation damage on the player.
	 */
	tick_starvation_damage = () => {
		for (const player of PlayerInfo.players_online) {
			if (player.hunger <= 0) {
				player.set_health(player.health--, DamageCause.STARVATION)
			}
		}
	}

	/**
	 * Performs void damage on players.
	 */
	tick_void_damage = () => {
		for (const client of PlayerInfo.players_online) {
			const posY = Math.floor(client.location.y)

			let min = -65

			if (Frog.config.world.generators.type === WorldGenerator.VOID) {
				min = undefined
			}

			if (typeof min === "number" && posY <= min) {
				const invulnerable =
					client.gamemode === Gamemode.CREATIVE ||
					client.gamemode === Gamemode.SPECTATOR

				if (!invulnerable) {
					client.set_health(client.health - 3, DamageCause.VOID)
				}
			}
		}
	}

	/**
	 * Ticks entity spawning.
	 */
	tickEntities = () => {
		if (entity.should_spawn_hostile_entities(time, this.generator)) {
			const coordinates = entity.get_random_spawn_coordinates()
			const runtimeId = entity.getRandomRuntimeId()
			const entity_name = entity.getRandomEntity()

			this.spawn_entity(
				entity_name,
				runtimeId,
				coordinates.x,
				coordinates.y,
				coordinates.z,
			)

			for (const player of PlayerInfo.players_online) {
				if (
					entity.should_follow_player(
						player.gamemode || "creative",
						player.isDead || false,
						coordinates.x || 0,
						player.location.x || 0,
						player.entity.isFollowing
					)
				) {
					player.entity.isFollowing = true

					vm.runInContext(
						entity.smoothly_teleport_to_player(
							runtimeId,
							player.location.x,
							player.location.z,
							coordinates.x,
							coordinates.y,
							coordinates.z,
						),
						vm.createContext(this)
					)

					setInterval(() => {
						vm.runInContext(
							entity.follow_player(
								runtimeId,
								player.location.x,
								player.location.z,
								coordinates.x,
								coordinates.y,
								coordinates.z,
							),
							vm.createContext(this)
						)
					}, 100)
				} else {
					setInterval(() => {
						vm.runInContext(
							entity.moveRandomly(
								runtimeId,
								coordinates.x,
								coordinates.z
							),
							vm.createContext(this)
						)
					}, 15000)
				}
			}
		}
	}

	/**
	 * Calculates and handles fall damage.
	 * NOTE: This can be spoofed by a hacked client.
	 *
	 * @param {import("Frog").Player} player - The player object.
	 * @param {import("Frog").Vec3} position - The position where the fall occurred.
	 * @async
	 */
	async handle_fall_damage(player, position) {
		if (
			player.gamemode !== Gamemode.CREATIVE &&
			player.gamemode !== Gamemode.SPECTATOR
		) {
			const fall_distance_y = player.location.y - position.y

			if (
				fall_distance_y > 0.56 &&
				player._damage.fall.queue &&
				!player._damage.fall.invulnerable
			) {
				const damage_amount = Math.floor(player.health - player._damage.fall.queue)

				player.set_health(damage_amount, DamageCause.FALL)

				player._damage.fall.invulnerable = true
				player._damage.fall.queue = 0

				setTimeout(() => {
					player._damage.fall.invulnerable = false
				}, 50)
			}

			player._damage.fall.queue = (fall_distance_y + 0.5) * 2
		}
	}

	/**
	 * Emits a world event
	 *
	 * @param {string} eventName - The name of the event to emit.
	 */
	emit_event(eventName) {
		Frog.event_emitter.emit(eventName, {
			world: this.get_world_data()
		})
	}

	/**
	 * Spawns an entity in the world
	 * 
	 * @param {string | import("Frog").EntityType} entity_name 
	 * @param {number} entity_id
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} z 
	 * @param {number} yaw 
	 * @param {number} pitch 
	 */
	spawn_entity(entity_name, entity_id, x, y, z, yaw = 0, pitch = 0) {
		let should_spawn_entity = true

		Frog.event_emitter.emit("entitySpawnEvent", {
			entity_name,
			entity_id,
			x,
			y,
			z,
			yaw,
			pitch,
			cancel() {
				should_spawn_entity = false
			}
		})

		if (!should_spawn_entity) return

		const add_entity_packet = new ServerAddEntityPacket()
		add_entity_packet.unique_id = String(entity_id)
		add_entity_packet.runtime_id = String(entity_id)
		add_entity_packet.entity_type = entity_name
		add_entity_packet.position = { x, y, z }
		add_entity_packet.velocity = { x: 0, y: 0, z: 0 }
		add_entity_packet.pitch = pitch
		add_entity_packet.yaw = yaw
		add_entity_packet.head_yaw = 0
		add_entity_packet.body_yaw = 0
		add_entity_packet.attributes = entityAttributes
		add_entity_packet.metadata = entityMetadata
		add_entity_packet.properties = { ints: [], floats: [] }
		add_entity_packet.links = []

		for (const player of PlayerInfo.players_online) {
			add_entity_packet.write_packet(player)
		}
	}

	/**
	 * Teleports an entity to specific coordinates
	 * 
	 * @param {number} entity_id 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} z 
	 * @param {number} [rotation_x] 
	 * @param {number} [rotation_y]
	 * @param {number} [rotation_z]
	 */
	teleport_entity(entity_id, x, y, z, rotation_x = 0, rotation_y = 0, rotation_z = 0) {
		let shouldTeleportEntity = true

		Frog.event_emitter.emit("entityTeleportEvent", {
			entity_id,
			x,
			y,
			z,
			rotation_x,
			rotation_y,
			rotation_z,
			cancel() {
				shouldTeleportEntity = false
			}
		})

		if (!shouldTeleportEntity) return

		const move_packet = new ServerMoveEntityDataPacket()
		move_packet.flags = {
			has_x: true,
			has_y: true,
			has_z: true,
			has_rot_x: false,
			has_rot_y: false,
			has_rot_z: false,
			on_ground: false,
			teleport: true,
			force_move: true,
		}
		move_packet.runtime_entity_id = String(entity_id)
		move_packet.coordinates.x = x
		move_packet.coordinates.y = y
		move_packet.coordinates.z = z
		move_packet.coordinatesRotation.x = Number(rotation_x)
		move_packet.coordinatesRotation.y = Number(rotation_y)
		move_packet.coordinatesRotation.z = Number(rotation_z)

		for (const player of PlayerInfo.players_online) {
			move_packet.write_packet(player)
		}
	}

	/**
	 * Removes an entity from the world
	 * 
	 * @param {number} entity_id 
	 */
	remove_entity(entity_id) {
		let shouldRemoveEntity = true

		Frog.event_emitter.emit("entityRemoveEvent", {
			entity_id,
			cancel() {
				shouldRemoveEntity = false
			}
		})

		if (!shouldRemoveEntity) return

		const remove_packet = new ServerRemoveEntityPacket()
		remove_packet.entity_id_self = String(entity_id)

		for (const player of PlayerInfo.players_online) {
			remove_packet.write_packet(player)
		}
	}

	/**
	 * Returns the world data.
	 *
	 * @returns {import("Frog").World}
	 */
	get_world_data() {
		return {
			name: this.name,
			render_distance: this.render_distance,
			spawnCoordinates: this.spawnCoordinates,
			generator: this.generator,
			time,
		}
	}
}

module.exports = World
