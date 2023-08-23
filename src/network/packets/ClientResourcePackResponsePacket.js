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
const Frog = require("../../Frog");

const Biome = require("../../world/types/Biome");
const PlayStatus = require("./types/PlayStatus");
const PlayerList = require("./types/PlayerListAction");
const Dimension = require("../../world/types/Dimension");
const Difficulty = require("../../server/types/Difficulty");
const MovementAuthority = require("./types/MovementAuthority");
const GeneratorType = require("../../world/types/Generator");
const ResourcePackStatus = require("./types/ResourcePackStatus");
const PermissionLevel = require("../../permission/PermissionLevel");

const PlayerInfo = require("../../player/PlayerInfo");

const Packet = require("./Packet");

const ServerCompressedBiomeDefinitionListPacket = require("./ServerCompressedBiomeDefinitionListPacket");
const ServerNetworkChunkPublisherUpdatePacket = require("./ServerNetworkChunkPublisherUpdatePacket");
const ServerAvailableEntityIdentifiersPacket = require("./ServerAvailableEntityIdentifiersPacket");
const ServerSetCommandsEnabledPacket = require("./ServerSetCommandsEnabledPacket");
const ServerClientCacheStatusPacket = require("./ServerClientCacheStatusPacket");
const ServerResourcePackStackPacket = require("./ServerResourcePackStackPacket");
const ServerCreativeContentPacket = require("./ServerCreativeContentPacket");
const ServerFeatureRegistryPacket = require("./ServerFeatureRegistryPacket");
const ServerItemComponentPacket = require("./ServerItemComponentPacket");
const ServerPlayerListPacket = require("./ServerPlayerListPacket");
const ServerStartGamePacket = require("./ServerStartGamePacket");
const ServerTrimDataPacket = require("./ServerTrimDataPacket");

const PermissionManager = require("../../permission/PermissionManager");

const ClientCommandManager = require("../../player/CommandManager");
const ServerCommandManager = require("../../server/CommandManager");

const Logger = require("../../utils/Logger");
const World = require("../../world/World");

const biomeDefinitions = require("../../resources/biomeDefinitions.json").raw_payload;
const availableEntities = require("../../resources/availableEntities.json").nbt;
const creativeContentItems = require("../../resources/creativeContent.json").items;
const entityData = require("../../resources/entityData.json").entityData;
const features = require("../../resources/featureRegistry.json").features;
const trimMaterials = require("../../resources/trimData.json").materials;
const itemStates = require("../../resources/itemStates.json").itemStates;
const trimPatterns = require("../../resources/trimData.json").patterns;
const customItems = require("../../../world/custom_items.json").items;
const gamerules = require("../../../world/gamerules.json").gamerules;

const { getKey } = require("../../utils/Language");

const config = Frog.config;

class ClientResourcePackResponsePacket extends Packet {
	name = "resource_pack_client_response";

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async readPacket(player, packet) {
		const responseStatus = packet.data.params.response_status;

		switch (responseStatus) {
			case ResourcePackStatus.NONE:
				Logger.info(getKey("status.resourcePacks.none").replace("%s", player.username));
				break;
			case ResourcePackStatus.REFUSED:
				Logger.info(getKey("status.resourcePacks.refused").replace("%s", player.username));
				player.kick(getKey("kickMessages.resourcePacksRefused"));
				break;
			case ResourcePackStatus.HAVE_ALL_PACKS:
				Logger.info(getKey("status.resourcePacks.installed").replace("%s", player.username));

				const resourcePackStack = new ServerResourcePackStackPacket();
				resourcePackStack.must_accept = false;
				resourcePackStack.behavior_packs = [];
				resourcePackStack.resource_packs = [];
				resourcePackStack.game_version = "";
				resourcePackStack.experiments = [];
				resourcePackStack.experiments_previously_used = false;
				resourcePackStack.writePacket(player);
				break;
			case ResourcePackStatus.COMPLETED:
				player.world = new World();
				player.world.renderDistance = config.world.renderDistance.serverSide;
				player.world.name = config.world.name;
				player.world.generator = config.world.generators.type.toLowerCase();

				player.permissions.op = false;
				player.permissions.permissionLevel = config.dev.defaultPermissionLevel;

				if (await PermissionManager.isOpped(player.username)) {
					player.permissions.op = true;
					player.permissions.permissionLevel = PermissionLevel.OPERATOR;
				}

				player.gamemode = config.world.gamemode.player;

				Logger.info(getKey("status.resourcePacks.joined").replace("%s", player.username));

				const startGame = new ServerStartGamePacket();
				startGame.entity_id = 0;
				startGame.runtime_entity_id = 1;
				startGame.player_gamemode = player.gamemode;
				startGame.player_position = { x: 0, y: -47, z: 0 };
				startGame.rotation = { x: 0, z: 0 };
				startGame.seed = [0, 0];
				startGame.biome_type = 0;
				startGame.biome_name = Biome.PLAINS;
				startGame.dimension = Dimension.OVERWORLD;
				startGame.generator = GeneratorType.FLAT;
				startGame.world_gamemode = config.world.gamemode.world;
				startGame.difficulty = Difficulty.NORMAL;
				startGame.spawn_position = { x: 0, y: 0, z: 0 };
				startGame.permission_level = /** @type {import("Frog").PermissionLevel} */ (player.permissions.permissionLevel);
				startGame.world_name = player.world.name;
				startGame.game_version = "*";
				startGame.movement_authority = MovementAuthority.SERVER;
				startGame.gamerules = gamerules;
				startGame.itemstates = itemStates;
				startGame.writePacket(player);

				const compressedBiomeDefinitions = new ServerCompressedBiomeDefinitionListPacket();
				compressedBiomeDefinitions.raw_payload = biomeDefinitions;
				compressedBiomeDefinitions.writePacket(player);

				const availableEntityIds = new ServerAvailableEntityIdentifiersPacket();
				availableEntityIds.nbt = availableEntities;
				availableEntityIds.writePacket(player);

				const creativeContent = new ServerCreativeContentPacket();
				creativeContent.items = creativeContentItems;
				creativeContent.writePacket(player);

				const commandsEnabled = new ServerSetCommandsEnabledPacket();
				commandsEnabled.enabled = true;
				commandsEnabled.writePacket(player);

				const trimData = new ServerTrimDataPacket();
				trimData.patterns = trimPatterns;
				trimData.materials = trimMaterials;
				trimData.writePacket(player);

				const featureRegistry = new ServerFeatureRegistryPacket();
				featureRegistry.features = features;
				featureRegistry.writePacket(player);

				const clientCacheStatus = new ServerClientCacheStatusPacket();
				clientCacheStatus.enabled = true;
				clientCacheStatus.writePacket(player);

				ClientCommandManager.init(player);

				for (const command of ServerCommandManager.commands) {
					const { requiresOp, name, description, aliases } = command;

					if (!Frog.config.chat.features.commands && (!requiresOp || player.permissions.op)) {
						ClientCommandManager.addCommand(player, name, description);

						if (aliases) {
							for (const alias of aliases) {
								ClientCommandManager.addCommand(player, alias, description);
							}
						}
					}
				}

				const itemComponent = new ServerItemComponentPacket(); // This packet is used to create custom items
				try {
					itemComponent.entries = customItems;
				} catch (error) {
					Logger.warning(getKey("warning.customItems.loading.failed").replace("%s", error.stack));
					itemComponent.entries = [];
				}
				itemComponent.writePacket(player);

				if (player.renderChunks) { // player.renderChunks is true by default but can be disabled by plugins
					player.setChunkRadius(player.world.renderDistance);

					const networkChunkPublisher = new ServerNetworkChunkPublisherUpdatePacket();
					networkChunkPublisher.coordinates = { x: 0, y: 0, z: 0 };
					networkChunkPublisher.radius = config.world.renderDistance.clientSide;
					networkChunkPublisher.saved_chunks = [];
					networkChunkPublisher.writePacket(player);

					const generatorFile = require("../../world/generator/" + player.world.generator);
					new generatorFile().generate(player);
				}

				Logger.info(getKey("status.resourcePacks.spawned").replace("%s", player.username));

				setTimeout(() => {
					player.sendPlayStatus(PlayStatus.PLAYER_SPAWN);

					Frog.eventEmitter.emit("playerSpawn", { player });

					player.setEntityData(/** @type {import("Frog").EntityData} */ (entityData));
					player.setSpeed(0.1);

					for (const onlinePlayer of PlayerInfo.playersOnline) {
						if (onlinePlayer.username === player.username) {
							return; // Vanilla behaviour
						}

						if (Frog.config.chat.systemMessages.join) {
							onlinePlayer.sendMessage(getKey("chat.broadcasts.joined").replace("%s", player.username));
						}

						const { xuid, uuid } = player.profile;

						const playerList = new ServerPlayerListPacket();
						playerList.type = PlayerList.ADD;
						playerList.username = player.username;
						playerList.xbox_id = xuid;
						playerList.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
						playerList.uuid = uuid;
						playerList.writePacket(onlinePlayer);
					}
				}, 2000);
		}
	}
}

module.exports = ClientResourcePackResponsePacket;
