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
const PlayerInfo = require("../../api/PlayerInfo");
const StartGame = require("./ServerStartGamePacket");
const PlayStatus = require("./ServerPlayStatusPacket");
const PlayerList = require("./ServerPlayerListPacket");
const PacketConstructor = require("./PacketConstructor");
const CreativeContent = require("./ServerCreativeContentPacket");
const PlayerSpawnEvent = require("../../events/PlayerSpawnEvent");
const ResourcePackStack = require("./ServerResourcePackStackPacket");
const ClientCacheStatus = require("./ServerClientCacheStatusPacket");
const SetCommandsEnabled = require("./ServerSetCommandsEnabledPacket");
const PacketHandlingError = require("./exceptions/PacketHandlingError");
const BiomeDefinitionList = require("./ServerBiomeDefinitionListPacket");
const AvailableEntityIdentifiers = require("./ServerAvailableEntityIdentifiersPacket");
const NetworkChunkPublisherUpdate = require("./ServerNetworkChunkPublisherUpdatePacket");
const PlayerHasAllResourcePacksEvent = require("../../events/PlayerHasAllResourcePacksEvent");
const PlayerResourcePacksRefusedEvent = require("../../events/PlayerResourcePacksRefusedEvent");
const PlayerResourcePacksCompletedEvent = require("../../events/PlayerResourcePacksCompletedEvent");
const PlayerHasNoResourcePacksInstalledEvent = require("../../events/PlayerHasNoResourcePacksInstalledEvent");
const ChunkRadiusUpdate = require("./ServerChunkRadiusUpdatePacket");
const CommandGamemode = require("../../commands/CommandGamemode");
const ResourcePackStatus = require("./types/ResourcePackStatus");
const CommandVersion = require("../../commands/CommandVersion");
const CommandManager = require("../../player/CommandManager");
const ItemComponent = require("./ServerItemComponentPacket");
const CommandStop = require("../../commands/CommandStop");
const CommandKick = require("../../commands/CommandKick");
const CommandList = require("../../commands/CommandList");
const CommandDeop = require("../../commands/CommandDeop");
const CommandTime = require("../../commands/CommandTime");
const WorldGenerator = require("./types/WorldGenerator");
const { config, lang } = require("../../api/ServerInfo");
const DefaultWorld = require("../../world/DefaultWorld");
const CommandSay = require("../../commands/CommandSay");
const LevelChunk = require("./ServerLevelChunkPacket");
const CommandMe = require("../../commands/CommandMe");
const CommandPl = require("../../commands/CommandPl");
const CommandOp = require("../../commands/CommandOp");
const PlayerListTypes = require("./types/PlayerList");
const ChunkError = require("./exceptions/ChunkError");
const PlayStatusType = require("./types/PlayStatus");
const ServerInfo = require("../../api/ServerInfo");
const Difficulty = require("./types/Difficulty");
const Generator = require("./types/Generator");
const Dimension = require("./types/Dimension");
const Logger = require("../../server/Logger");
const Biome = require("./types/Biome");
const fs = require("fs");

class ClientResourcePackResponsePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
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
	 * @param {any} player
	 * @param {JSON} packet
	 * @param {any} server
	 */
	async readPacket(player, packet, server) {
		const responseStatus = packet.data.params.response_status;
		await this.validatePacket(responseStatus);

		switch (responseStatus) {
			case ResourcePackStatus.NONE:
				const noRpsInstalledEvent = new PlayerHasNoResourcePacksInstalledEvent();
				noRpsInstalledEvent.resourcePacksIds = [];
				noRpsInstalledEvent.resourcePacksRequired = true;
				noRpsInstalledEvent.server = server;
				noRpsInstalledEvent.player = player;

				Logger.info(lang.playerstatuses.noRpsInstalled.replace("%player%", player.username));
				break;
			case ResourcePackStatus.REFUSED:
				const refusedInstalled = new PlayerResourcePacksRefusedEvent();
				refusedInstalled.execute(server, player);

				Logger.info(lang.playerstatuses.rpsrefused.replace("%player%", player.username));
				player.kick(lang.kickmessages.resourcePacksRefused);
				break;
			case ResourcePackStatus.HAVEALLPACKS: {
				const hasAllPacksEvent = new PlayerHasAllResourcePacksEvent();
				hasAllPacksEvent.resourcePacksIds = [];
				hasAllPacksEvent.resourcePacksRequired = true;
				hasAllPacksEvent.server = server;
				hasAllPacksEvent.player = player;
				hasAllPacksEvent.execute();

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
				const completeEvent = new PlayerResourcePacksCompletedEvent();
				completeEvent.server = server;
				completeEvent.player = player;
				completeEvent.execute();

				player.world = new DefaultWorld();
				player.world.setChunkRadius(require("../../../world/world_settings").chunkLoadRadius);
				player.world.setName(require("../../../world/world_settings.json").worldName);
				if (config.generator === WorldGenerator.DEFAULT) {
					player.world.setSpawnCoordinates(1070, 139, -914);
				} else if (config.generator === WorldGenerator.VOID) {
					player.world.setSpawnCoordinates(0, 100, 0);
				} else {
					player.world.setSpawnCoordinates(0, -58, 0);
				}

				const ops = fs.readFileSync("ops.yml", "utf8").split("\n");

				for (const op of ops) {
					if (op.replace(/\r/g, "") === player.username) {
						player.op = true;
						player.permlevel = 4;
						break;
					}
				}

				if (!player.op) player.permlevel = config.defaultPermissionLevel;

				Logger.info(lang.playerstatuses.joined.replace("%player%", player.username));

				const startgame = new StartGame();
				startgame.setEntityId(0);
				startgame.setRunTimeEntityId(0);
				startgame.setGamemode(config.gamemode);
				startgame.setPlayerPosition(player.world.getSpawnCoordinates().x, player.world.getSpawnCoordinates().y, player.world.getSpawnCoordinates().z);
				startgame.setPlayerRotation(1, 1);
				startgame.setSeed(-1);
				startgame.setBiomeType(0);
				startgame.setBiomeName(Biome.PLAINS);
				startgame.setDimension(Dimension.OVERWORLD);
				startgame.setGenerator(Generator.FLAT);
				startgame.setWorldGamemode(config.worldGamemode);
				startgame.setDifficulty(Difficulty.NORMAL);
				startgame.setSpawnPosition(0, 0, 0);
				startgame.setPlayerPermissionLevel(player.permlevel);
				startgame.setWorldName(player.world.getName());
				startgame.writePacket(player);

				const biomedeflist = new BiomeDefinitionList();
				biomedeflist.setValue(require("./res/biomes.json"));
				biomedeflist.writePacket(player);

				const availableentityids = new AvailableEntityIdentifiers();
				availableentityids.setValue(require("./res/entities.json"));
				availableentityids.writePacket(player);

				const creativecontent = new CreativeContent();
				creativecontent.setItems(require("./res/creativeContent.json").items);
				creativecontent.writePacket(player);

				const commandsenabled = new SetCommandsEnabled();
				commandsenabled.setEnabled(true);
				commandsenabled.writePacket(player);

				const clientcachestatus = new ClientCacheStatus();
				clientcachestatus.setEnabled(true);
				clientcachestatus.writePacket(player);

				const commandmanager = new CommandManager();
				commandmanager.init(player);
				if (config.playerCommandVersion) {
					commandmanager.addCommand(player, new CommandVersion().name().toLowerCase(), new CommandVersion().getPlayerDescription());
					commandmanager.addCommand(player, new CommandVersion().aliases()[0].toLowerCase(), new CommandVersion().getPlayerDescription());
				}
				if (config.playerCommandPlugins) {
					commandmanager.addCommand(player, new CommandPl().name().toLowerCase(), new CommandPl().getPlayerDescription());
					commandmanager.addCommand(player, new CommandPl().aliases()[0].toLowerCase(), new CommandPl().getPlayerDescription());
				}
				if (config.playerCommandList) {
					commandmanager.addCommand(player, new CommandList().name().toLowerCase(), new CommandList().getPlayerDescription());
				}
				if (config.playerCommandMe) {
					commandmanager.addCommand(player, new CommandMe().name().toLowerCase(), new CommandMe().getPlayerDescription());
				}
				if (player.op) {
					if (config.playerCommandStop) {
						commandmanager.addCommand(player, new CommandStop().name().toLowerCase(), new CommandStop().getPlayerDescription());
					}
					if (config.playerCommandSay) {
						commandmanager.addCommand(player, new CommandSay().name().toLowerCase(), new CommandSay().getPlayerDescription());
					}
					if (config.playerCommandOp) {
						commandmanager.addCommand(player, new CommandOp().name().toLowerCase(), new CommandOp().getPlayerDescription());
					}
					if (config.playerCommandKick) {
						commandmanager.addCommand(player, new CommandKick().name().toLowerCase(), new CommandKick().getPlayerDescription());
					}
					if (config.playerCommandTime) {
						commandmanager.addCommand(player, new CommandTime().name().toLowerCase(), new CommandTime().getPlayerDescription());
					}
					if (config.playerCommandDeop) {
						commandmanager.addCommand(player, new CommandDeop().name().toLowerCase(), new CommandDeop().getPlayerDescription());
					}
					if (config.playerCommandGamemode) {
						commandmanager.addCommand(player, new CommandGamemode().name().toLowerCase(), new CommandGamemode().getPlayerDescription());
					}
				}

				// This packet is used to set custom items
				const itemcomponent = new ItemComponent();
				try {
					itemcomponent.setItems(require("../../../../world/custom_items.json").items);
				} catch (e) {
					itemcomponent.setItems([]);
				}
				itemcomponent.writePacket(player);

				if (player.chunksEnabled) {
					const chunkradiusupdate = new ChunkRadiusUpdate();
					chunkradiusupdate.setChunkRadius(player.world.getChunkRadius());
					chunkradiusupdate.writePacket(player);

					const cords =
						config.generator === WorldGenerator.DEFAULT
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

					const networkchunkpublisher = new NetworkChunkPublisherUpdate();
					networkchunkpublisher.setCords(cords.x, cords.y, cords.z);
					networkchunkpublisher.setRadius(require("../../../world/world_settings.json").networkChunkLoadRadius);
					networkchunkpublisher.setSavedChunks([]);
					networkchunkpublisher.writePacket(player);

					let chunks = null;

					try {
						chunks = require(`${__dirname}/../../../world/chunks${config.generator === WorldGenerator.DEFAULT ? "" : "_flat"}.json`);
					} catch (e) {
						throw new ChunkError(`${lang.errors.failedToLoadWorld} ${e}`);
					}

					for (const chunk of chunks) {
						const levelchunk = new LevelChunk();
						levelchunk.setX(chunk.x);
						levelchunk.setZ(chunk.z);
						levelchunk.setSubChunkCount(chunk.sub_chunk_count);
						levelchunk.setCacheEnabled(chunk.cache_enabled);
						try {
							levelchunk.setPayload(chunk.payload.data);
						} catch (e) {
							throw new ChunkError(lang.errors.failedToLoadWorld_InvalidChunkData);
						}
						levelchunk.writePacket(player);
					}

					player.network_chunks_loop = setInterval(() => {
						if (player.offline) {
							// Do not send network_chunk_publisher_update packet to offline players
							delete player.network_chunks_loop;
							return;
						}

						const networkchunkpublisher = new NetworkChunkPublisherUpdate();
						networkchunkpublisher.setCords(cords.x, cords.y, cords.z);
						networkchunkpublisher.setRadius(require("../../../world/world_settings.json").networkChunkLoadRadius);
						networkchunkpublisher.setSavedChunks([]);
						networkchunkpublisher.writePacket(player);
					}, 4500);
				}

				Logger.info(lang.playerstatuses.spawned.replace("%player%", player.username));

				setTimeout(() => {
					if (player.offline) return;

					const ps = new PlayStatus();
					ps.setStatus(PlayStatusType.PLAYERSPAWN);
					ps.writePacket(player);

					const spawnEvent = new PlayerSpawnEvent();
					spawnEvent.player = player;
					spawnEvent.server = server;
					spawnEvent.execute();

					player.setEntityData("can_climb", true);
					player.setEntityData("can_fly", false);
					player.setEntityData("walker", true);
					player.setEntityData("moving", true);
					player.setEntityData("breathing", true);
					player.setEntityData("has_collision", true);
					player.setEntityData("affected_by_gravity", true);

					ServerInfo.__addPlayer();
					for (const onlineplayers of PlayerInfo.players) {
						if (onlineplayers.username == player.username) {
							Logger.debug("Ignored bad PlayerList packet");
						} else {
							let xuid = player.profile.xuid;
							let uuid = player.profile.uuid;

							const pl = new PlayerList();
							pl.setType(PlayerListTypes.ADD);
							pl.setUsername(player.username);
							pl.setXboxID(xuid);
							pl.setId(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
							pl.setUuid(uuid);
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
