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
/* eslint-disable no-case-declarations */
const fs = require("fs");

const Frog = require("../../Frog");

const Biome = require("./types/Biome");
const Dimension = require("./types/Dimension");
const Difficulty = require("./types/Difficulty");
const Generator = require("./types/Generator");
const PlayStatusType = require("./types/PlayStatus");
const PlayerListTypes = require("./types/PlayerList");
const ResourcePackStatus = require("./types/ResourcePackStatus");
const FrogWorldGenerators = require("./types/FrogWorldGenerators");

const PlayerInfo = require("../../api/player/PlayerInfo");

const ChunkLoadException = require("../../utils/exceptions/ChunkLoadException");

const AvailableEntityIdentifiers = require("./ServerAvailableEntityIdentifiersPacket")
const BiomeDefinitionList = require("./ServerBiomeDefinitionListPacket");
const ClientCacheStatus = require("./ServerClientCacheStatusPacket");
const CreativeContent = require("./ServerCreativeContentPacket");
const ItemComponent = require("./ServerItemComponentPacket");
const LevelChunk = require("./ServerLevelChunkPacket");
const NetworkChunkPublisherUpdate = require("./ServerNetworkChunkPublisherUpdatePacket");
const PacketConstructor = require("./PacketConstructor");
const PacketHandlingError = require("./exceptions/PacketHandlingError");
const PlayStatus = require("./ServerPlayStatusPacket");
const PlayerList = require("./ServerPlayerListPacket");
const ResourcePackStack = require("./ServerResourcePackStackPacket");
const SetCommandsEnabled = require("./ServerSetCommandsEnabledPacket");
const StartGame = require("./ServerStartGamePacket");

const CommandManager = require("../../player/CommandManager");

const World = require("../../world/World");

const Logger = require("../../server/Logger");

const { serverConfigurationFiles } = require("../../Frog");
const { lang, config } = serverConfigurationFiles

const Commands = require("../../server/Commands");

class ClientResourcePackResponsePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string} The name of the packet
	 */
	getPacketName() {
		return "resource_pack_client_response";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return true;
	}

	/**
	 * Validates the packet
	 * @param {ResourcePackStatus} response_status
	 */
	async validatePacket(response_status) {
		const valid = [ResourcePackStatus.NONE, ResourcePackStatus.REFUSED, ResourcePackStatus.HAVEALLPACKS, ResourcePackStatus.COMPLETED];

		if (!valid.includes(response_status)) {
			throw new PacketHandlingError("Invalid resource pack status! " + response_status);
		}
	}

	/**
	 * Reads the packet from player
	 * 
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} server
	 */
	async readPacket(player, packet, server) {
		const responseStatus = packet.data.params.response_status;
		await this.validatePacket(responseStatus);

		switch (responseStatus) {
			case ResourcePackStatus.NONE:
				Frog.eventEmitter.emit('playerHasNoResourcePacksInstalled', {
					resourcePacksIds: [],
					resourcePacksRequired: true,
					server: server,
					player: player
				});

				Logger.info(lang.playerstatuses.noRpsInstalled.replace("%player%", player.username));
				break;
			case ResourcePackStatus.REFUSED:
				Frog.eventEmitter.emit('playerResourcePacksRefused', {
					server: server,
					player: player
				});

				Logger.info(lang.playerstatuses.rpsrefused.replace("%player%", player.username));
				player.kick(lang.kickmessages.resourcePacksRefused);
				break;
			case ResourcePackStatus.HAVEALLPACKS: {
				Frog.eventEmitter.emit('playerHasAllResourcePacks', {
					resourcePacksIds: [],
					resourcePacksRequired: true,
					server: server,
					player: player
				});

				Logger.info(lang.playerstatuses.rpsInstalled.replace("%player%", player.username));

				const resourcePackStack = new ResourcePackStack();
				resourcePackStack.setMustAccept(false);
				resourcePackStack.setBehaviorPacks([]);
				resourcePackStack.setResourcePacks([]);
				resourcePackStack.setGameVersion("");
				resourcePackStack.setExperiments([]);
				resourcePackStack.setExperimentsPreviouslyUsed(false);
				resourcePackStack.writePacket(player);
				break;
			}
			case ResourcePackStatus.COMPLETED:
				Frog.eventEmitter.emit('playerResourcePacksCompleted', {
					server: server,
					player: player
				});

				player.world = new World();
				player.world.setChunkRadius(require("../../../world/world_settings.json").chunkLoadRadius);
				player.world.setName(require("../../../world/world_settings.json").worldName);

				if (config.world.generator === FrogWorldGenerators.DEFAULT) {
					player.world.setSpawnCoordinates(1070, 87, -914);
				} else if (config.world.generator === FrogWorldGenerators.VOID) {
					player.world.setSpawnCoordinates(0, 100, 0);
				} else {
					player.world.setSpawnCoordinates(0, -58, 0);
				}

				const ops = fs.readFileSync("ops.yml", "utf8").split("\n");

				for (const op of ops) {
					if (op.replace(/\r/g, "") === player.username) {
						player.op = true;
						player.permissionLevel = 4;
						break;
					}
				}

				if (!player.op) player.permissionLevel = config.dev.defaultPermissionLevel;

				Logger.info(lang.playerstatuses.joined.replace("%player%", player.username));

				const startGame = new StartGame();
				startGame.setEntityId(0);
				startGame.setRunTimeEntityId(0);
				startGame.setGamemode(config.world.gamemode);
				startGame.setPlayerPosition(player.world.getSpawnCoordinates().x, player.world.getSpawnCoordinates().y, player.world.getSpawnCoordinates().z);
				startGame.setPlayerRotation(0, 0);
				startGame.setSeed(-1);
				startGame.setBiomeType(0);
				startGame.setBiomeName(Biome.PLAINS);
				startGame.setDimension(Dimension.OVERWORLD);
				startGame.setGenerator(Generator.FLAT);
				startGame.setWorldGamemode(config.world.worldGamemode);
				startGame.setDifficulty(Difficulty.NORMAL);
				startGame.setSpawnPosition(0, 0, 0);
				startGame.setPlayerPermissionLevel(player.permissionLevel);
				startGame.setWorldName(player.world.getName());
				startGame.writePacket(player);

				const biomeDefinitionList = new BiomeDefinitionList();
				biomeDefinitionList.setValue(require("../../internalResources/biomes.json"));
				biomeDefinitionList.writePacket(player);

				const availableEntityIDs = new AvailableEntityIdentifiers();
				availableEntityIDs.setValue(require("../../internalResources/entities.json"));
				availableEntityIDs.writePacket(player);

				const creativeContent = new CreativeContent();
				creativeContent.setItems(require("../../internalResources/creativeContent.json").items);
				creativeContent.writePacket(player);

				const commandsEnabled = new SetCommandsEnabled();
				commandsEnabled.setEnabled(true);
				commandsEnabled.writePacket(player);

				const clientCacheStatus = new ClientCacheStatus();
				clientCacheStatus.setEnabled(true);
				clientCacheStatus.writePacket(player);

				const commandManager = new CommandManager();
				commandManager.init(player);

				for (const command of Commands.commandList) {
					commandManager.addCommand(player, command.data.name, command.data.description)

					const aliases = command.data.aliases;

					if (aliases) {
						for (const alias of aliases) {
							commandManager.addCommand(player, alias, command.data.description)
						}
					}
				}

				// This packet is used to set custom items
				const itemcomponent = new ItemComponent();
				try {
					itemcomponent.setItems(require("../../../world/custom_items.json").items);
				} catch (e) {
					Logger.warning("Failed to load custom items! " + e)
					itemcomponent.setItems([]);
				}
				itemcomponent.writePacket(player);

				if (player.chunksEnabled) {
					player.setChunkRadius(player.world.getChunkRadius())

					const coordinates =
						config.world.generator === FrogWorldGenerators.DEFAULT
							? {
								x: 1070,
								y: 274,
								z: -915,
							}
							: {
								x: -17,
								y: 117,
								z: 22,
							};

					const networkChunkPublisher = new NetworkChunkPublisherUpdate();
					networkChunkPublisher.setCoordinates(coordinates.x, coordinates.y, coordinates.z);
					networkChunkPublisher.setRadius(require("../../../world/world_settings.json").networkChunkLoadRadius);
					networkChunkPublisher.setSavedChunks([]);
					networkChunkPublisher.writePacket(player);

					let chunks = null;

					try {
						chunks = require(`${__dirname}/../../../world/chunks${config.world.generator === FrogWorldGenerators.DEFAULT ? "" : "_flat"}.json`);
					} catch (e) {
						throw new ChunkLoadException(`${lang.errors.failedToLoadWorld} ${e}`);
					}

					for (const chunk of chunks) {
						const levelChunk = new LevelChunk();
						levelChunk.setX(chunk.x);
						levelChunk.setZ(chunk.z);
						levelChunk.setSubChunkCount(chunk.sub_chunk_count);
						levelChunk.setCacheEnabled(chunk.cache_enabled);
						try {
							levelChunk.setPayload(chunk.payload.data);
						} catch (e) {
							throw new ChunkLoadException(lang.errors.failedToLoadWorld_InvalidChunkData);
						}
						levelChunk.writePacket(player);
					}

					player.network_chunks_loop = setInterval(() => {
						if (player.offline) {
							// Do not send network_chunk_publisher_update packet to offline players
							delete player.network_chunks_loop;
							return;
						}

						const networkChunkPublisher = new NetworkChunkPublisherUpdate();
						networkChunkPublisher.setCoordinates(coordinates.x, coordinates.y, coordinates.z);
						networkChunkPublisher.setRadius(require("../../../world/world_settings.json").networkChunkLoadRadius);
						networkChunkPublisher.setSavedChunks([]);
						networkChunkPublisher.writePacket(player);
					}, 4500);
				}

				Logger.info(lang.playerstatuses.spawned.replace("%player%", player.username));

				setTimeout(() => {
					if (player.offline) return;

					const ps = new PlayStatus();
					ps.setStatus(PlayStatusType.PLAYERSPAWN);
					ps.writePacket(player);

					Frog.eventEmitter.emit('playerSpawn', {
						player,
						server
					})

					player.setEntityData("can_climb", true);
					player.setEntityData("can_fly", false);
					player.setEntityData("walker", true);
					player.setEntityData("moving", true);
					player.setEntityData("breathing", true);
					player.setEntityData("has_collision", true);
					player.setEntityData("affected_by_gravity", true);

					Frog.__addPlayer();

					for (const onlineplayers of PlayerInfo.players) {
						if (onlineplayers.username == player.username) {
							Logger.debug("Ignored invalid PlayerList packet");
						} else {
							let xuid = player.profile.xuid;
							let uuid = player.profile.uuid;

							const pl = new PlayerList();
							pl.setType(PlayerListTypes.ADD);
							pl.setUsername(player.username);
							pl.setXboxID(xuid);
							pl.setId(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
							pl.setUUID(uuid);
							pl.writePacket(onlineplayers);
						}
					}
				}, 2000);

				setTimeout(() => {
					if (player.offline) return;
					for (let i = 0; i < PlayerInfo.players.length; i++) {
						if (PlayerInfo.players[i].username == player.username) return; // Vanilla behaviour
						PlayerInfo.players[i].sendMessage(lang.broadcasts.joinedTheGame.replace("%username%", player.username));
					}
				}, 1000);
		}
	}
}

module.exports = ClientResourcePackResponsePacket;
