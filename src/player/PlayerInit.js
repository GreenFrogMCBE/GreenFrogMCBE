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
const { get_key } = require("../utils/Language")

const LegacyToRuntimeIdConverter = require("../block/LegacyToRuntimeIdConverter")

const ServerTextPacket = require("../network/packets/ServerTextPacket")
const ServerTransferPacket = require("../network/packets/ServerTransferPacket")
const ServerSetEntityMotion = require("../network/packets/ServerSetEntityMotion")
const ServerSetDifficultyPacket = require("../network/packets/ServerSetDifficultyPacket")
const ServerSetEntityDataPacket = require("../network/packets/ServerSetEntityDataPacket")
const ServerContainerOpenPacket = require("../network/packets/ServerContainerOpenPacket")
const ServerMoveEntityDataPacket = require("../network/packets/ServerMoveEntityDataPacket")
const ServerChangeDimensionPacket = require("../network/packets/ServerChangeDimensionPacket")
const ServerInventoryContentPacket = require("../network/packets/ServerInventoryContentPacket")
const ServerSetPlayerGameTypePacket = require("../network/packets/ServerSetPlayerGameTypePacket")
const ServerChunkRadiusUpdatePacket = require("../network/packets/ServerChunkRadiusUpdatePacket")

const {
	Text,
	WindowId,
	Attribute,
	WindowType,
} = require("@greenfrog/mc-enums")

const { Event, EventEmitter } = require("@kotinash/better-events")

const HungerCause = require("./types/HungerCause")

const Frog = require("../Frog")

module.exports = {
	/**
	 * Adds API functions to the player object
	 *
	 * @param {import("Frog").Player} player
	 */
	async initPlayer(player) {

		/**
		 * Sends a chat message as the player
		 *
		 * @param {string} message
		 */
		player.chat = function (message) {
			let cancel = false

			Frog.event_emitter.emit("serverChat", {
				player,
				message,
				cancel: () => {
					cancel = true
				},
			})

			if (cancel) return

			Frog.broadcast_message(
				get_key("chat.format", [player.username, message])
			)
		}

		/**
		 * Teleports the player
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} z
		 * @param {number | undefined} rotation_x
		 * @param {number | undefined} rotation_y
		 * @param {number | undefined} rotation_z
		 */
		player.teleport = function (x, y, z, rotation_x = undefined, rotation_y = undefined, rotation_z = undefined) {
			let shouldTeleport = true

			Frog.event_emitter.emit("playerTeleport", {
				player,
				x,
				y,
				z,
				rotation_x,
				rotation_y,
				rotation_z,
				cancel: () => {
					shouldTeleport = false
				},
			})

			if (!shouldTeleport) return

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
			move_packet.runtime_entity_id = 1
			move_packet.coordinates.x = x
			move_packet.coordinates.y = y
			move_packet.coordinates.z = z
			move_packet.coordinates_rotation.x = Number(rotation_x)
			move_packet.coordinates_rotation.y = Number(rotation_y)
			move_packet.coordinates_rotation.z = Number(rotation_z)
			move_packet.write_packet(player)
		}

		/**
		 * Sets player's local difficulty
		 *
		 * @param {import("Frog").Difficulty} difficulty
		 */
		player.setDifficulty = function (difficulty) {
			let shouldChangeDifficulty = true

			Frog.event_emitter.emit("serverSetDifficulty", {
				player,
				difficulty,
				cancel: () => {
					shouldChangeDifficulty = false
				},
			})

			if (!shouldChangeDifficulty) return

			const difficultyPacket = new ServerSetDifficultyPacket()
			difficultyPacket.difficulty = difficulty
			difficultyPacket.write_packet(player)
		}

		/**
		 * Sets the data of the player (e.g. on_fire, etc.)
		 *
		 * @param {import("Frog").EntityData} data
		 */
		player.set_entity_data = function (data) {
			EventEmitter.emit(
				new Event(
					"serverSetEntityData",
					{
						player,
						data,
					}
				),
				(() => {
					const player_set_entity_data_packet = new ServerSetEntityDataPacket()
					player_set_entity_data_packet.properties = {
						ints: [],
						floats: [],
					}
					player_set_entity_data_packet.runtime_entity_id = "1" // Local player
					player_set_entity_data_packet.tick = "0"
					player_set_entity_data_packet.value = data
					player_set_entity_data_packet.write_packet(player)
				})
			)
		}

		/**
		 * Updates the player chunk render radius
		 *
		 * @param {number} radius
		 */
		player.set_chunk_radius = function (radius) {
			EventEmitter.emit(
				new Event(
					"serverUpdateChunkRadius",
					{
						player,
						radius
					},
					(() => {
						const chunk_radius_update = new ServerChunkRadiusUpdatePacket()
						chunk_radius_update.chunk_radius = radius
						chunk_radius_update.write_packet(player)
					})
				)
			)
		}

		/**
		 * Sets the hunger of the player
		 *
		 * @param {number} hunger
		 * @param {import("Frog").HungerCause} cause
		 */
		player.set_hunger = function (hunger, cause = HungerCause.Unknown) {
			EventEmitter.emit(
				new Event(
					"playerHungerUpdate",
					{
						player,
						hunger,
						cause,
					},
					(() => {
						player.setAttribute({
							name: Attribute.Hunger,
							min: 0,
							max: 20,
							current: hunger,
							default: 0,
							modifiers: [],
						})

						player.hunger = hunger
					})
				)
			)
		}
		/**
		 * Opens a container for the player
		 */
		player.open_container = function () {
			let shouldPreCreateInventoryContainer = true

			Frog.event_emitter.emit("inventoryContainerPreCreate", {
				player: player,
				cancel: () => {
					shouldPreCreateInventoryContainer = false
				},
			})

			if (!shouldPreCreateInventoryContainer) return

			player.inventory.container.block_position = { x: Math.floor(player.location.x - 1), y: player.location.y + 2, z: Math.floor(player.location.z - 1) }
			player.inventory.container.window = { id: WindowId.CHEST, type: WindowType.CONTAINER }

			let shouldCreateInventoryContainer = true

			Frog.event_emitter.emit("inventoryContainerCreate", {
				player: player,
				inventory: player.inventory,
				cancel: () => {
					shouldCreateInventoryContainer = false
				},
			})

			if (!shouldCreateInventoryContainer) return

			player.world.place_block(
				player.inventory.container.block_position.x,
				player.inventory.container.block_position.y,
				player.inventory.container.block_position.z,
				LegacyToRuntimeIdConverter.convert(54)
			)

			const containerOpen = new ServerContainerOpenPacket()
			containerOpen.window_id = player.inventory.container.window.id
			containerOpen.window_type = player.inventory.container.window.type
			containerOpen.runtime_entity_id = -1
			containerOpen.coordinates = {
				x: player.inventory.container.block_position.x,
				y: player.inventory.container.block_position.y,
				z: player.inventory.container.block_position.z
			}
			containerOpen.write_packet(player)

			player.inventory.container.isOpen = true
		}

		/**
		 * Updates an item in a container (if open)
		 *
		 * @param {number} item_id
		 * @param {number} block_runtime_id - You can convert the item ID to a block runtime ID using https://github.com/GreenFrogMCBE/GreenFrogMCBE/blob/main/src/api/block/LegacyToRuntimeIdConverter.js
		 * @param {number} [slot=0]
		 * @param {boolean} [has_metadata=false]
		 * @param {boolean} has_stack_id
		 * @param {number} stack_id
		 * @param {number} [count=1]
		 * @param {import("Frog").ItemExtraData} extra - Extra data
		 */
		player.setContainerItem = function (item_id, block_runtime_id, slot = 0, has_metadata = false, has_stack_id = true, stack_id = 1, count = 1, extra = { has_nbt: false, can_place_on: [], can_destroy: [] }) {
			let should_give_container_item = true

			Frog.event_emitter.emit("inventoryContainerGiveItem", {
				player,
				item_data: {
					item_id,
					block_runtime_id,
					slot,
					has_metadata,
					has_stack_id,
					stack_id,
					count,
					extra,
				},
				cancel: () => {
					should_give_container_item = false
				},
			})

			if (!should_give_container_item) return

			/** @type {import("Frog").Item[]} */
			const input = []

			for (let i = 0; i < 27; i++) {
				input.push({ network_id: 0 })
			}

			input[slot] = {
				network_id: item_id,
				count,
				metadata: has_metadata,
				has_stack_id,
				stack_id,
				block_runtime_id,
				extra,
			}

			const inventoryContent = new ServerInventoryContentPacket()
			inventoryContent.window_id = WindowId.CHEST
			inventoryContent.input = input
			inventoryContent.write_packet(player)
		}
	},
}
