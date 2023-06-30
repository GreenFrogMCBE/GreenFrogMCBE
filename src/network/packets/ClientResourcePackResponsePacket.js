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
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
/* eslint-disable no-case-declarations */
const Frog = require("../../Frog");

const Biome = require("../../world/types/Biome");
const PlayStatusType = require("./types/PlayStatus");
const Gamemode = require("../../api/player/Gamemode");
const PlayerListType = require("./types/PlayerListType");
const Dimension = require("../../world/types/Dimension");
const Difficulty = require("../../api/types/Difficulty");
const MovementAuthority = require("./types/MovementAuthority");
const GeneratorType = require("../../world/types/GeneratorType");
const ResourcePackStatus = require("./types/ResourcePackStatus");
const WorldGenerator = require("../../world/types/WorldGenerator");
const PlayerAttribute = require("../../api/attribute/PlayerAttribute");

const PlayerInfo = require("../../api/player/PlayerInfo");

const PacketConstructor = require("./PacketConstructor");

const ServerCompressedBiomeDefinitionListPacket = require("./ServerCompressedBiomeDefinitionListPacket");
const ServerNetworkChunkPublisherUpdatePacket = require("./ServerNetworkChunkPublisherUpdatePacket");
const ServerAvailableEntityIdentifiersPacket = require("./ServerAvailableEntityIdentifiersPacket");
const ServerSetCommandsEnabledPacket = require("./ServerSetCommandsEnabledPacket");
const ServerClientCacheStatusPacket = require("./ServerClientCacheStatusPacket");
const ServerResourcePackStackPacket = require("./ServerResourcePackStackPacket");
const ServerCreativeContentPacket = require("./ServerCreativeContentPacket");
const ServerFeatureRegistryPacket = require("./ServerFeatureRegistryPacket")
const ServerItemComponentPacket = require("./ServerItemComponentPacket");
const ServerPlayStatusPacket = require("./ServerPlayStatusPacket");
const ServerPlayerListPacket = require("./ServerPlayerListPacket");
const ServerStartGamePacket = require("./ServerStartGamePacket");
const ServerTrimDataPacket = require("./ServerTrimDataPacket");

const OfflinePermissionManager = require("../../api/permission/OfflinePermissionManager")
const CommandManager = require("../../api/player/CommandManager");
const Commands = require("../../server/Commands");

const Logger = require("../../server/Logger");
const World = require("../../world/World");

const compressedBiomeDefinitionData = require("../../resources/biomeDefinitions.json").raw_payload
const defaultEntityData = require("../../resources/defaultEntityData.json").entityData
const creativeContentData = require("../../resources/creativeContent.json").items
const featureRegistryData = require("../../resources/featureRegistry.json");
const itemStatesData = require("../../resources/itemStates.json").itemStates
const gamerulesData = require("../../../world/gamerules.json").gamerules
const availableEntitiesData = require("../../resources/entities.json")
const dumpedTrimData = require("../../resources/trimData.json")
const customItems = require("../../../world/custom_items.json")

const { getKey } = require("../../utils/Language");

const { serverConfigurationFiles } = require("../../Frog");
const { config } = serverConfigurationFiles;

const WorldGenerationFailedException = require("../../utils/exceptions/WorldGenerationFailedException");

class ClientResourcePackResponsePacket extends PacketConstructor {
	name = 'resource_pack_client_response'

	async readPacket(player, packet, server) {
		const responseStatus = packet.data.params.response_status;

		switch (responseStatus) {
			case ResourcePackStatus.NONE:
				Frog.eventEmitter.emit("playerHasNoResourcePacksInstalled", {
					resourcePacksIds: [],
					resourcePacksRequired: true,
					server,
					player,
					cancel: () => player.kick(getKey("kickMessages.serverDisconnect")),
				});

				Logger.info(getKey("status.resourcePacks.none").replace("%s%", player.username));
				break;
			case ResourcePackStatus.REFUSED:
				Frog.eventEmitter.emit("playerResourcePacksRefused", { server, player, cancel: () => player.kick(getKey("kickMessages.serverDisconnect")) });

				Logger.info(getKey("status.resourcePacks.refused").replace("%s%", player.username));
				player.kick(getKey("kickMessages.resourcePacksRefused"));
				break;
			case ResourcePackStatus.HAVE_ALL_PACKS:
				Frog.eventEmitter.emit("playerHasAllResourcePacks", {
					resourcePacksIds: [],
					resourcePacksRequired: true,
					server: server,
					player: player,
				});

				Logger.info(getKey("status.resourcePacks.installed").replace("%s%", player.username));

				const resourcePackStack = new ServerResourcePackStackPacket();
				resourcePackStack.must_accept = false;
				resourcePackStack.behavior_packs = []
				resourcePackStack.resource_packs = [];
				resourcePackStack.game_version = "";
				resourcePackStack.experiments = [];
				resourcePackStack.experiments_previously_used = false;
				resourcePackStack.writePacket(player);
				break;
			case ResourcePackStatus.COMPLETED:
				Frog.eventEmitter.emit("playerResourcePacksCompleted", {
					server: server,
					player: player,
				});

				player.world = new World();
				player.world.renderDistance = config.world.renderDistance;
				player.world.worldName = config.world.worldName;

				switch (config.world.generator.toLowerCase()) {
					case "default":
						player.world.generator = WorldGenerator.DEFAULT;
						break;
					case "flat":
						player.world.generator = WorldGenerator.FLAT;
						break;
					case "void":
						player.world.generator = WorldGenerator.VOID;
						break;
					default:
						throw new WorldGenerationFailedException(getKey("exceptions.generator.invalid"));
				}

				player.op = false

				if (OfflinePermissionManager.isOpped(player.username)) {
					player.op = true;
					player.permissionLevel = 4;
				}

				if (!player.op) player.permissionLevel = config.dev.defaultPermissionLevel;

				Logger.info(getKey("status.resourcePacks.joined").replace("%s%", player.username));

				const startGame = new ServerStartGamePacket();
				startGame.entity_id = 0;
				startGame.runtime_entity_id = 1;
				startGame.player_gamemode = config.world.gamemode;
				startGame.player_position = { x: 0, y: -47, z: 0 }
				startGame.rotation = { x: 0, z: 0 };
				startGame.seed = [0, 0];
				startGame.biome_type = 0;
				startGame.biome_name = Biome.PLAINS;
				startGame.dimension = Dimension.OVERWORLD;
				startGame.generator = GeneratorType.FLAT;
				startGame.world_gamemode = config.world.worldGamemode;
				startGame.world = player.world.worldName
				startGame.difficulty = Difficulty.NORMAL;
				startGame.spawn_position = { x: 0, y: 0, z: 0 }
				startGame.permission_level = player.permissionLevel;
				startGame.world_name = player.world.worldName;
				startGame.game_version = "*"
				startGame.movement_authority = MovementAuthority.SERVER
				startGame.gamerules = gamerulesData
				startGame.itemstates = itemStatesData
				startGame.writePacket(player);

				const compressedBiomeDefinitions = new ServerCompressedBiomeDefinitionListPacket()
				compressedBiomeDefinitions.data = require("../../resources/biomeDefinitions.json")
				compressedBiomeDefinitions.writePacket(player)

				const availableEntityIds = new ServerAvailableEntityIdentifiersPacket();
				availableEntityIds.value = availableEntitiesData;
				availableEntityIds.writePacket(player);

				const creativeContent = new ServerCreativeContentPacket();
				creativeContent.items = creativeContentData;
				creativeContent.writePacket(player);

				const commandsEnabled = new ServerSetCommandsEnabledPacket();
				commandsEnabled.enable = true;
				commandsEnabled.writePacket(player);

				const trimData = new ServerTrimDataPacket();
				trimData.patterns = dumpedTrimData.patterns;
				trimData.materials = dumpedTrimData.materials;
				trimData.writePacket(player);

				const featureRegistry = new ServerFeatureRegistryPacket()
				featureRegistry.features = featureRegistryData
				featureRegistry.writePacket(player)

				const clientCacheStatus = new ServerClientCacheStatusPacket();
				clientCacheStatus.enabled = true;
				clientCacheStatus.writePacket(player);

				const commandManager = new CommandManager();
				commandManager.init(player);

				for (const command of Commands.commandList) {
					const { requiresOp, name, description, aliases } = command.data;

					if (player.op || !requiresOp) {
						commandManager.addCommand(player, name, description);

						if (aliases) {
							for (const alias of aliases) {
								commandManager.addCommand(player, alias, description);
							}
						}
					}
				}

				// This packet is used to create custom items
				const itemcomponent = new ServerItemComponentPacket();
				try {
					itemcomponent.entries = customItems.items;
				} catch (error) {
					Logger.warning(getKey("warning.customItems.loading.failed").replace("%s%", error.stack));
					itemcomponent.entries = [];
				}
				itemcomponent.writePacket(player);

				// player.chunksEnabled is true by default but can be disabled by plugins
				if (player.chunksEnabled) {
					player.setChunkRadius(player.world.renderDistance);

					const networkChunkPublisher = new ServerNetworkChunkPublisherUpdatePacket();
					networkChunkPublisher.coordinates = { x: 0, y: 0, z: 0 };
					networkChunkPublisher.radius = config.world.clientSideRenderDistance;
					networkChunkPublisher.saved_chunks = [];
					networkChunkPublisher.writePacket(player);

					const generatorFile = require("../../world/generator/" + player.world.generator);
					new generatorFile().generate(player);

					player.hungerLossLoop = setInterval(() => {
						if (player.offline) {
							delete player.hungerLossLoop;
							return;
						}

						if (player.gamemode == Gamemode.CREATIVE || player.gamemode == Gamemode.SPECTATOR) return;

						player.setHunger(player.hunger - 0.5);
					}, 30000);

					player.networkChunksLoop = setInterval(() => {
						if (player.offline) {
							delete player.networkChunksLoop;
							return;
						}

						const networkChunkPublisher = new ServerNetworkChunkPublisherUpdatePacket();
						networkChunkPublisher.coordinates = { x: 0, y: 0, z: 0 };
						networkChunkPublisher.radius = config.world.clientSideRenderDistance;
						networkChunkPublisher.saved_chunks = [];
						networkChunkPublisher.writePacket(player);
					}, 4500);
				}

				Logger.info(getKey("status.resourcePacks.spawned").replace("%s%", player.username));

				setTimeout(() => {
					const playStatus = new ServerPlayStatusPacket();
					playStatus.status = PlayStatusType.PLAYER_SPAWN;
					playStatus.writePacket(player);

					Frog.eventEmitter.emit("playerSpawn", {
						player,
						server,
					});

					player.setEntityData(defaultEntityData);
					player.setAttribute({
						"min": 0,
						"max": 3.4028234663852886e+38,
						"current": 0.10000000149011612,
						"default": 0.10000000149011612,
						"name": PlayerAttribute.MOVEMENT_SPEED,
						"modifiers": []
					})

					Frog.__addPlayer();

					for (const onlineplayers of PlayerInfo.players) {
						if (onlineplayers.username == player.username) {
							Logger.debug(getKey("debug.playerlist.invalid"));
						} else {
							const xuid = player.profile.xuid;
							const uuid = player.profile.uuid;

							const playerList = new ServerPlayerListPacket();
							playerList.type = PlayerListType.ADD;
							playerList.username = player.username;
							playerList.xbox_id = xuid;
							playerList.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
							playerList.uuid = (uuid);
							playerList.writePacket(onlineplayers);
						}
					}
				}, 2000);

				setTimeout(() => {
					for (const playerInfo of PlayerInfo.players) {
						if (playerInfo.username === player.username) {
							return; // Vanilla behaviour
						}

						playerInfo.sendMessage(getKey("chat.broadcasts.joined").replace("%s%", player.username));
					}
				}, 1000);
		}
	}
}

module.exports = ClientResourcePackResponsePacket;
