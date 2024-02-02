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

const PermissionLevel = require("../../permission/types/PermissionLevel")
const ResourcePackStatus = require("./types/ResourcePackStatus")
const MovementAuthority = require("./types/MovementAuthority")
const GeneratorType = require("../../world/types/Generator")
const Difficulty = require("../../server/types/Difficulty")
const EditorLevelType = require("./types/EditorLevelType")
const Dimension = require("../../world/types/Dimension")
const PlayerList = require("./types/PlayerListAction")
const PlayStatus = require("./types/PlayStatus")

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

const PermissionManager = require("../../permission/PermissionManager")

const ClientCommandManager = require("../../player/CommandManager")
const ServerCommandManager = require("../../server/CommandManager")

const Logger = require("../../utils/Logger")

const World = require("../../world/World")

const WorldGenerator = require("../../world/types/WorldGenerator")
const Biome = require("../../world/types/Biome")

const entity = require("../../entity/EntityModule").getModule()

const biomeDefinitions = require("../../resources/json/biomeDefinitions.json").raw_payload
const creativeContentItems = require("../../resources/json/creativeContent.json").items
const availableEntities = require("../../resources/json/availableEntities.json").nbt
const features = require("../../resources/json/featureRegistry.json").features
const entityData = require("../../resources/json/entityData.json").entityData
const trimMaterials = require("../../resources/json/trimData.json").materials
const itemStates = require("../../resources/json/itemStates.json").itemStates
const trimPatterns = require("../../resources/json/trimData.json").patterns
const customItems = require("../../../world/custom_items.json").items
const gamerules = require("../../../world/gamerules.json").gamerules

const { get_key } = require("../../utils/Language")

const config = Frog.config

class ClientResourcePackResponsePacket extends Packet {
	name = "resource_pack_client_response"

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async read_packet(player, packet) {
		const responseStatus = packet.data.params.response_status

		switch (responseStatus) {
			case ResourcePackStatus.NONE:
				Logger.info(get_key("status.resourcePacks.none").replace("%s", player.username))
				break
			case ResourcePackStatus.REFUSED:
				Logger.info(get_key("status.resourcePacks.refused").replace("%s", player.username))
				player.kick(get_key("kickMessages.resourcePacksRefused"))
				break
			case ResourcePackStatus.HAVE_ALL_PACKS:
				Logger.info(get_key("status.resourcePacks.installed").replace("%s", player.username))

				const resourcePackStack = new ServerResourcePackStackPacket()
				resourcePackStack.must_accept = false
				resourcePackStack.behavior_packs = []
				resourcePackStack.resource_packs = []
				resourcePackStack.game_version = ""
				resourcePackStack.experiments = []
				resourcePackStack.experiments_previously_used = false
				resourcePackStack.write_packet(player)
				break
			case ResourcePackStatus.COMPLETED:
				player.world = new World()
				player.world.render_distance = config.world.render_distance.serverSide
				player.world.name = config.world.name
				player.world.generator = config.world.generators.type.toLowerCase()

				player.world.spawnCoordinates = { x: 0, y: -48, z: 0 }

				if (player.world.generator == WorldGenerator.FLAT) {
					player.world.spawnCoordinates.y = -47
				}

				entity.setSpawnYCoordinate(player.world.spawnCoordinates.y - 2)

				player.permissions.op = false
				player.permissions.permissionLevel = config.dev.defaultPermissionLevel

				if (await PermissionManager.isOpped(player.username)) {
					player.permissions.op = true
					player.permissions.permissionLevel = PermissionLevel.OPERATOR
				}

				player.gamemode = config.world.gamemode.player

				Logger.info(get_key("status.resourcePacks.joined").replace("%s", player.username))

				const startGame = new ServerStartGamePacket()
				startGame.entity_id = 0
				startGame.runtime_entity_id = 1
				startGame.player_gamemode = player.gamemode
				startGame.player_position = player.world.spawnCoordinates
				startGame.rotation = { x: 0, z: 0 }
				startGame.seed = [0, 0]
				startGame.biome_type = 0
				startGame.biome_name = Biome.PLAINS
				startGame.dimension = Dimension.OVERWORLD
				startGame.generator = GeneratorType.FLAT
				startGame.world_gamemode = config.world.gamemode.world
				startGame.difficulty = Difficulty.NORMAL
				startGame.spawn_position = { x: 0, y: 0, z: 0 }
				startGame.editor_world_type = EditorLevelType.NOT_EDITOR
				startGame.permission_level = player.permissions.permissionLevel
				startGame.world_name = player.world.name
				startGame.game_version = "*"
				startGame.movement_authority = MovementAuthority.SERVER
				startGame.gamerules = gamerules
				startGame.itemstates = itemStates
				startGame.write_packet(player)

				const compressedBiomeDefinitions = new ServerCompressedBiomeDefinitionListPacket()
				compressedBiomeDefinitions.raw_payload = biomeDefinitions
				compressedBiomeDefinitions.write_packet(player)

				const availableEntityIds = new ServerAvailableEntityIdentifiersPacket()
				availableEntityIds.nbt = availableEntities
				availableEntityIds.write_packet(player)

				const creativeContent = new ServerCreativeContentPacket()
				creativeContent.items = creativeContentItems
				creativeContent.write_packet(player)

				const commandsEnabled = new ServerSetCommandsEnabledPacket()
				commandsEnabled.enabled = true
				commandsEnabled.write_packet(player)

				const trimData = new ServerTrimDataPacket()
				trimData.patterns = trimPatterns
				trimData.materials = trimMaterials
				trimData.write_packet(player)

				const featureRegistry = new ServerFeatureRegistryPacket()
				featureRegistry.features = features
				featureRegistry.write_packet(player)

				const clientCacheStatus = new ServerClientCacheStatusPacket()
				clientCacheStatus.enabled = true
				clientCacheStatus.write_packet(player)

				ClientCommandManager.init(player)

				for (const command of ServerCommandManager.commands) {
					const { requiresOp, name, description, aliases, args } = command

					if (!Frog.config.chat.features.commands && (!requiresOp || player.permissions.op)) {
						ClientCommandManager.addCommand(player, name, description, args)

						if (aliases) {
							for (const alias of aliases) {
								ClientCommandManager.addCommand(player, alias, description, args)
							}
						}
					}
				}

				// This packet is used to create custom items
				const itemComponent = new ServerItemComponentPacket()
				try {
					itemComponent.entries = customItems
				} catch (error) {
					Logger.warning(get_key("warning.customItems.loading.failed").replace("%s", error.stack))
					itemComponent.entries = []
				}
				itemComponent.write_packet(player)

				// player.renderChunks is true by default but can be disabled by plugins
				if (player.renderChunks) {
					player.setChunkRadius(player.world.render_distance)

					const network_chunk_publisher = new ServerNetworkChunkPublisherUpdatePacket()
					network_chunk_publisher.coordinates = { x: 0, y: 0, z: 0 }
					network_chunk_publisher.radius = config.world.render_distance.client_side
					network_chunk_publisher.saved_chunks = []
					network_chunk_publisher.write_packet(player)

					const generatorFileName = player.world.generator[0].toUpperCase() + player.world.generator.substring(1)
					const generatorFile = require("../../world/generator/" + generatorFileName)
					new generatorFile().generate(player)
				}

				Logger.info(get_key("status.resourcePacks.spawned").replace("%s", player.username))

				setTimeout(() => {
					player.sendPlayStatus(PlayStatus.PLAYER_SPAWN)

					Frog.event_emitter.emit("playerSpawn", { player })

					player.setEntityData(/** @type {import("Frog").EntityData} */(entityData))
					player.setSpeed(0.1)

					for (const onlinePlayer of PlayerInfo.players_online) {
						if (onlinePlayer.username === player.username) {
							return // Vanilla behaviour
						}

						if (Frog.config.chat.systemMessages.join) {
							onlinePlayer.send_message(get_key("chat.broadcasts.joined").replace("%s", player.username))
						}

						const { xuid, uuid } = player.profile

						const playerList = new ServerPlayerListPacket()
						playerList.type = PlayerList.ADD
						playerList.username = player.username
						playerList.xbox_id = xuid
						playerList.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
						playerList.uuid = uuid
						playerList.write_packet(onlinePlayer)
					}
				}, 2000)
		}
	}
}

module.exports = ClientResourcePackResponsePacket
