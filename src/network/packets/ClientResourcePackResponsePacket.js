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
/* eslint-disable no-case-declarations */
const Frog = require("../../Frog")

const {
	Biome,
	Dimension,
	PlayStatus,
	Difficulty,
	EditorLevelType,
	PlayerListAction,
	MovementAuthority,
	ResourcePackStatus,
	WorldGenerationType,
} = require("@greenfrog/mc-enums")

const PlayerInfo = require("../../player/PlayerInfo")

const Packet = require("./Packet")

const ServerCompressedBiomeDefinitionListPacket = require("./ServerCompressedBiomeDefinitionListPacket")
const ServerNetworkChunkPublisherUpdatePacket = require("./ServerNetworkChunkPublisherUpdatePacket")
const ServerAvailableEntityIdentifiersPacket = require("./ServerAvailableEntityIdentifiersPacket")
const ServerSetCommandsEnabledPacket = require("./ServerSetCommandsEnabledPacket")
const ServerClientCacheStatusPacket = require("./ServerClientCacheStatusPacket")
const ServerResourcePackStackPacket = require("./ServerResourcePackStackPacket")
const ServerCreativeContentPacket = require("./ServerCreativeContentPacket")
const ServerFeatureRegistryPacket = require("./ServerFeatureRegistryPacket")
const ServerItemComponentPacket = require("./ServerItemComponentPacket")
const ServerPlayerListPacket = require("./ServerPlayerListPacket")
const ServerStartGamePacket = require("./ServerStartGamePacket")
const ServerTrimDataPacket = require("./ServerTrimDataPacket")

const ClientCommandManager = require("../../player/CommandManager")
const ServerCommandManager = require("../../server/CommandManager")

const {
	EventEmitter,
	Event
} = require("@kotinash/better-events")

const Logger = require("../../utils/Logger")

const { raw_payload: biome_definitions } = require("../../resources/json/biome_definitions.json")
const { items: creative_content_items } = require("../../resources/json/creative_content.json")
const { nbt: available_entities } = require("../../resources/json/available_entities.json")
const { materials: trim_materials } = require("../../resources/json/trim_data.json")
const { patterns: trim_patterns } = require("../../resources/json/trim_data.json")
const { items: custom_items } = require("../../../world/custom_items.json")
const { features } = require("../../resources/json/feature_registry.json")
const { entity_data } = require("../../resources/json/entity_data.json")
const { item_states } = require("../../resources/json/item_states.json")
const gamerules = require("../../../world/gamerules.json")

const { get_key } = require("../../utils/Language")

const config = Frog.config

class ClientResourcePackResponsePacket extends Packet {
	name = "resource_pack_client_response"

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async read_packet(player, packet) {
		const response_status = packet.data.params.response_status

		switch (response_status) {
			case ResourcePackStatus.None:
				return Logger.info(get_key("status.resourcePacks.none", [player.name]))
			case ResourcePackStatus.Refused:
				Logger.info(get_key("status.resourcePacks.refused", [player.name]))

				return player.kick(get_key("kickMessages.resourcePacksRefused"))
			case ResourcePackStatus.HaveAllPacks:
				Logger.info(get_key("status.resourcePacks.installed", [player.name]))

				const resource_pack_stack = new ServerResourcePackStackPacket()
				resource_pack_stack.must_accept = false
				resource_pack_stack.behavior_packs = []
				resource_pack_stack.resource_packs = []
				resource_pack_stack.game_version = ""
				resource_pack_stack.experiments = []
				resource_pack_stack.experiments_previously_used = false
				resource_pack_stack.write_packet(player)
				break
			case ResourcePackStatus.Completed:
				Logger.info(get_key("status.resourcePacks.joined", [player.name]))

				const start_game = new ServerStartGamePacket()
				start_game.entity_id = 0
				start_game.runtime_entity_id = 1
				start_game.player_gamemode = player.gamemode
				start_game.player_position = player.world.spawn_coordinates
				start_game.rotation = { x: 0, z: 0 }
				start_game.seed = [0, 0]
				start_game.biome_type = 0
				start_game.biome_name = Biome.Plains
				start_game.dimension = Dimension.Overworld
				start_game.generator = WorldGenerationType.Flat
				start_game.world_gamemode = config.world.gamemode.world
				start_game.difficulty = Difficulty.Normal
				start_game.spawn_position = { x: 0, y: 0, z: 0 }
				start_game.editor_world_type = EditorLevelType.NotEditor
				start_game.permission_level = player.permissions.permission_level
				start_game.world_name = player.world.name
				start_game.game_version = "*"
				start_game.movement_authority = MovementAuthority.Server
				start_game.gamerules = gamerules
				start_game.itemstates = item_states
				start_game.write_packet(player)

				const compressed_biome_definitions = new ServerCompressedBiomeDefinitionListPacket()
				compressed_biome_definitions.raw_payload = biome_definitions
				compressed_biome_definitions.write_packet(player)

				const available_entity_ids = new ServerAvailableEntityIdentifiersPacket()
				available_entity_ids.nbt = available_entities
				available_entity_ids.write_packet(player)

				// const creative_content = new ServerCreativeContentPacket()
				// creative_content.items = creative_content_items
				// creative_content.write_packet(player)

				const commands_enabled = new ServerSetCommandsEnabledPacket()
				commands_enabled.enabled = true
				commands_enabled.write_packet(player)

				const trim_data = new ServerTrimDataPacket()
				trim_data.patterns = trim_patterns
				trim_data.materials = trim_materials
				trim_data.write_packet(player)

				const feature_registry = new ServerFeatureRegistryPacket()
				feature_registry.features = features
				feature_registry.write_packet(player)

				const client_cache_status = new ServerClientCacheStatusPacket()
				client_cache_status.enabled = true
				client_cache_status.write_packet(player)

				ClientCommandManager.init(player)

				for (const command of ServerCommandManager.commands) {
					const { requires_op, name, description, aliases, args } = command

					if (!Frog.config.chat.features.commands && (!requires_op || player.permissions.op)) {
						ClientCommandManager.add_command(player, name, description, args)

						if (aliases) {
							for (const alias of aliases) {
								ClientCommandManager.add_command(player, alias, description, args)
							}
						}
					}
				}

				// This packet is used to create custom items
				const item_component = new ServerItemComponentPacket()

				try {
					item_component.entries = custom_items
				} catch (error) {
					Logger.warning(get_key("warning.customItems.loading.failed", [error.stack]))

					item_component.entries = []
				}

				item_component.write_packet(player)

				// player.render_chunks is true by default but can be disabled by plugins
				if (player.render_chunks) {
					player.set_chunk_radius(player.world.render_distance)

					const network_chunk_publisher = new ServerNetworkChunkPublisherUpdatePacket()
					network_chunk_publisher.coordinates = { x: 0, y: 0, z: 0 }
					network_chunk_publisher.radius = config.world.render_distance.client_side
					network_chunk_publisher.saved_chunks = []
					network_chunk_publisher.write_packet(player)

					const generator_file_name = player.world.generator[0].toUpperCase() + player.world.generator.substring(1)
					const generator_file = require("../../world/generator/" + generator_file_name)

					new generator_file()
						.generate(player)
				}

				Logger.info(
					get_key("status.resourcePacks.spawned",
						[
							player.name
						]
					)
				)

				player.send_play_status(PlayStatus.PlayerSpawn)

				EventEmitter.emit(
					new Event(
						"playerSpawn",
						{
							player
						}
					),
					false
				)

				player.set_entity_data(/** @type {import("Frog").EntityData} */ (entity_data))
				player.set_speed(0.1)

				for (const online_player of PlayerInfo.players_online) {
					if (online_player.name === player.name) {
						continue // Vanilla behaviour
					}

					if (Frog.config.chat.system_messages.join) {
						online_player.send_message(get_key("chat.broadcasts.joined", [player.name]))
					}

					const { xuid, uuid } = player.profile

					const player_list = new ServerPlayerListPacket()
					player_list.type = PlayerListAction.Add
					player_list.username = player.name
					player_list.xbox_id = xuid
					player_list.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
					player_list.uuid = uuid
					player_list.write_packet(online_player)
				}
		}
	}
}

module.exports = ClientResourcePackResponsePacket
