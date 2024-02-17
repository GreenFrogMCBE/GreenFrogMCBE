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

const {
	WorldGenerationType,
	Gamemode,
	Air
} = require("@greenfrog/mc-enums")

const entity_attributes = require("../../src/resources/json/entity_attributes.json")
const entity_metadata = require("../../src/resources/json/entity_metadata.json")

const entity = require("../entity/EntityModule").get_module()

const {EventEmitter,Event} = require("@kotinash/better-events")

const DamageCause = require("../player/types/DamageCause")

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
		 * @type {import("@greenfrog/mc-enums").Vec3}
		 */
		this.spawn_coordinates = { x: 0, y: 0, z: 0 }

		/**
		 * @type {number}
		 */
		this.render_distance = 4

		/**
		 * @type {import("@greenfrog/mc-enums").WorldGenerationType}
		 */
		this.generator = WorldGenerationType.Default

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
	 * @param {import("@greenfrog/mc-enums").Block} block - The block to place.
	 */
	place_block(x, y, z, block) {
		for (const player of PlayerInfo.players_online) {
			this.send_block_update_packet(player, x, y, z, block.id)
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
		this.place_block(x, y, z, new Air())
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
			{ enabled: ticking_config.event, function: this.tick_event },
			{ enabled: ticking_config.time, function: this.tick_time },
			{ enabled: ticking_config.void, function: this.tick_void_damage },
			{ enabled: ticking_config.regeneration, function: this.tick_regeneration },
			{ enabled: ticking_config.starvation_damage, function: this.tick_starvation_damage },
			{ enabled: ticking_config.entities, function: this.tick_entities }
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
	tick_hunger_loss() {
		for (const player of PlayerInfo.players_online) {
			if (player.gamemode === Gamemode.CREATIVE || player.gamemode === Gamemode.Spectator) {
				return
			}

			player.set_hunger(player.hunger - 0.5)
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
	tick_event = () => {
		this.emit_event("serverTick")
	}

	/**
	 * Ticks the world time
	 */
	tick_time = () => {
		time += 10

		for (const player of PlayerInfo.players_online) {
			player.set_time(time)
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
				player.gamemode === Gamemode.Creative ||
				player.gamemode === Gamemode.Spectator
			)) {
				player.set_health(player.health++, DamageCause.Regeneration)
			}
		}
	}

	/**
	 * Performs starvation damage on the player.
	 */
	tick_starvation_damage = () => {
		for (const player of PlayerInfo.players_online) {
			if (player.hunger <= 0) {
				player.set_health(player.health--, DamageCause.Starvation)
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

			if (Frog.config.world.generators.type === WorldGenerationType.Void) {
				min = undefined
			}

			if (typeof min === "number" && posY <= min) {
				const invulnerable =
					client.gamemode === Gamemode.Creative ||
					client.gamemode === Gamemode.Spectator

				if (!invulnerable) {
					client.set_health(client.health - 3, DamageCause.Void)
				}
			}
		}
	}

	/**
	 * Ticks entity spawning.
	 */
	tick_entities = () => {
		if (entity.should_spawn_hostile_entities(time, this.generator)) {
			const coordinates = entity.get_random_spawn_coordinates()
			const runtime_id = entity.get_random_runtime_id()
			const entity_name = entity.get_random_entity()

			this.spawn_entity(
				entity_name,
				runtime_id,
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
						player.entity.is_following
					)
				) {
					player.entity.is_following = true

					vm.runInContext(
						entity.smoothly_teleport_to_player(
							runtime_id,
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
								runtime_id,
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
							entity.move_randomly(
								runtime_id,
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
			player.gamemode !== Gamemode.Creative &&
			player.gamemode !== Gamemode.Spectator
		) {
			const fall_distance_y = player.location.y - position.y

			if (
				fall_distance_y > 0.56 &&
				player._internal.fall_damage.queue &&
				!player._internal.fall_damage.invulnerable
			) {
				const damage_amount = Math.floor(player.health - player._damage.fall.queue)

				player.set_health(damage_amount, DamageCause.Fall)

				player._internal.fall_damage.invulnerable = true
				player._internal.fall_damage.queue = 0

				setTimeout(() => {
					player._internal.fall_damage.invulnerable = false
				}, 50)
			}

			player._internal.fall_damage.queue = (fall_distance_y + 0.5) * 2
		}
	}

	/**
	 * Emits a world event
	 *
	 * @param {string} event_name - The name of the event to emit.
	 */
	emit_event(event_name) {
		EventEmitter.emit(
			new Event(
				event_name,
				{
					world: this.get_world_data()
				}
			),
			true
		)
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
		EventEmitter.emit(
			new Event(
				"entitySpawnEvent",
				{
					entity_name,
					entity_id,
					x,
					y,
					z,
					yaw,
					pitch,
				},
				(() => {
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
					add_entity_packet.attributes = entity_attributes
					add_entity_packet.metadata = entity_metadata
					add_entity_packet.properties = { ints: [], floats: [] }
					add_entity_packet.links = []

					for (const player of PlayerInfo.players_online) {
						add_entity_packet.write_packet(player)
					}
				})
			)
		)
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
		EventEmitter.emit(
			new Event(
				"entityTeleportEvent",
				{
					entity_id,
					x,
					y,
					z,
					rotation_x,
					rotation_y,
					rotation_z
				},
				(() => {
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
					move_packet.coordinates_rotation.x = Number(rotation_x)
					move_packet.coordinates_rotation.y = Number(rotation_y)
					move_packet.coordinates_rotation.z = Number(rotation_z)

					for (const player of PlayerInfo.players_online) {
						move_packet.write_packet(player)
					}
				})
			)
		)
	}

	/**
	 * Removes an entity from the world
	 *
	 * @param {number} entity_id
	 */
	remove_entity(entity_id) {
		EventEmitter.emit(
			new Event(
				"entityRemoveEvent",
				{
					entity_id
				},
				(() => {
					const remove_packet = new ServerRemoveEntityPacket()
					remove_packet.entity_id_self = String(entity_id)

					for (const player of PlayerInfo.players_online) {
						remove_packet.write_packet(player)
					}
				})
			),
		)
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
			spawn_coordinates: this.spawn_coordinates,
			generator: this.generator,
			time,
		}
	}
}

module.exports = World
