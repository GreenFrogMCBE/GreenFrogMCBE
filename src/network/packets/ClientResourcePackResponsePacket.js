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

const Biome = require("../../world/types/Biome");
const PlayStatusType = require("./types/PlayStatus");
const PlayerListTypes = require("./types/PlayerList");
const Dimension = require("../../world/types/Dimension");
const Difficulty = require("../../api/types/Difficulty");
const Generator = require("../../world/types/Generator");
const ResourcePackStatus = require("./types/ResourcePackStatus");
const WorldGenerators = require("../../world/types/WorldGenerators");

const PlayerInfo = require("../../api/player/PlayerInfo");

const ChunkLoadException = require("../../utils/exceptions/ChunkLoadException");

const PacketConstructor = require("./PacketConstructor");

const NetworkChunkPublisherUpdate = require("./ServerNetworkChunkPublisherUpdatePacket");
const AvailableEntityIdentifiers = require("./ServerAvailableEntityIdentifiersPacket");
const BiomeDefinitionList = require("./ServerBiomeDefinitionListPacket");
const SetCommandsEnabled = require("./ServerSetCommandsEnabledPacket");
const ClientCacheStatus = require("./ServerClientCacheStatusPacket");
const ResourcePackStack = require("./ServerResourcePackStackPacket");
const CreativeContent = require("./ServerCreativeContentPacket");
const ItemComponent = require("./ServerItemComponentPacket");
const LevelChunk = require("./ServerLevelChunkPacket");
const PlayStatus = require("./ServerPlayStatusPacket");
const PlayerList = require("./ServerPlayerListPacket");
const StartGame = require("./ServerStartGamePacket");

const CommandManager = require("../../player/CommandManager");

const World = require("../../world/World");

const Logger = require("../../server/Logger");

const Commands = require("../../server/Commands");

const { getKey } = require("../../utils/Language");

const { serverConfigurationFiles } = require("../../Frog");
const { config } = serverConfigurationFiles;

class ClientResourcePackResponsePacket extends PacketConstructor {
    /**
     * Returns the packet name
     * @returns {string}
     */
    getPacketName() {
        return "resource_pack_client_response";
    }

    /**
     * Returns if the packet is critical?
     * @returns {boolean}
     */
    isCriticalPacket() {
        return true;
    }

    /**
     * Reads the packet from the player
     * @param {Client} player
     * @param {JSON} packet
     * @param {Server} server
     */
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
            case ResourcePackStatus.HAVEALLPACKS:
                Frog.eventEmitter.emit("playerHasAllResourcePacks", {
                    resourcePacksIds: [],
                    resourcePacksRequired: true,
                    server: server,
                    player: player,
                });

                Logger.info(getKey("status.resourcePacks.installed").replace("%s%", player.username));

                const resourcePackStack = new ResourcePackStack();
                resourcePackStack.setMustAccept(false);
                resourcePackStack.setBehaviorPacks([]);
                resourcePackStack.setResourcePacks([]);
                resourcePackStack.setGameVersion("");
                resourcePackStack.setExperiments([]);
                resourcePackStack.setExperimentsPreviouslyUsed(false);
                resourcePackStack.writePacket(player);
                break;
            case ResourcePackStatus.COMPLETED:
                Frog.eventEmitter.emit("playerResourcePacksCompleted", {
                    server: server,
                    player: player,
                });

                player.world = new World();
                player.world.setChunkRadius(require("../../../world/world_settings.json").chunkLoadRadius);
                player.world.setName(require("../../../world/world_settings.json").worldName);

                if (config.world.generator === WorldGenerators.DEFAULT) {
                    player.world.setSpawnCoordinates(1070, 87, -914);
                } else if (config.world.generator === WorldGenerators.FLAT) {
                    player.world.setSpawnCoordinates(-274, -58, -211);
                } else {
					player.chunksEnabled = false
                    player.world.setSpawnCoordinates(0, 100, 0);
                }

                player.location.x = player.world.getSpawnCoordinates().x;
                player.location.y = player.world.getSpawnCoordinates().y;
                player.location.z = player.world.getSpawnCoordinates().z;

                const ops = fs.readFileSync("ops.yml", "utf8").split("\n");

                if (ops.includes(player.username)) {
                    player.op = true;
                    player.permissionLevel = 4;
                } else {
                    player.op = false;
                }

                if (!player.op) player.permissionLevel = config.dev.defaultPermissionLevel;

                Logger.info(getKey("status.resourcePacks.joined").replace("%s%", player.username));

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
                const itemcomponent = new ItemComponent();
                try {
                    itemcomponent.setItems(require("../../../world/custom_items.json").items);
                } catch (error) {
                    Logger.warning(getKey("warning.customItems.loading.failed").replace("%s%", error.stack));
                    itemcomponent.setItems([]);
                }
                itemcomponent.writePacket(player);

				// player.chunksEnabled is true by default, but can be disabled by plugins
                if (player.chunksEnabled) {
                    player.setChunkRadius(player.world.getChunkRadius());

                    const coordinates =
                        config.world.generator === WorldGenerators.DEFAULT
                            ? {
                                x: 1070,
                                y: 274,
                                z: -915,
                            }
                            : {
                                x: -279,
                                y: 111,
                                z: -216,
                            };

                    const networkChunkPublisher = new NetworkChunkPublisherUpdate();
                    networkChunkPublisher.setCoordinates(coordinates.x, coordinates.y, coordinates.z);
                    networkChunkPublisher.setRadius(require("../../../world/world_settings.json").networkChunkLoadRadius);
                    networkChunkPublisher.setSavedChunks([]);
                    networkChunkPublisher.writePacket(player);

                    let chunks = null;

                    try {
                        chunks = require(`${__dirname}/../../../world/chunks${config.world.generator === WorldGenerators.DEFAULT ? "" : "_flat"}.json`).data;
                    } catch (error) {
                        throw new ChunkLoadException(getKey("exceptions.world.loading.failed").replace("%s%", error.stack));
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
                            throw new ChunkLoadException(getKey("exceptions.world.loading.failed.invalidChunkData"));
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

                Logger.info(getKey("status.resourcePacks.spawned").replace("%s%", player.username));

                setTimeout(() => {
                    const playStatus = new PlayStatus();
                    playStatus.setStatus(PlayStatusType.PLAYER_SPAWN);
                    playStatus.writePacket(player);

                    Frog.eventEmitter.emit("playerSpawn", {
                        player,
                        server,
                    });

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
                            Logger.debug(getKey("debug.playerlist.invalid"));
                        } else {
                            const xuid = player.profile.xuid;
                            const uuid = player.profile.uuid;

                            const playerList = new PlayerList();
                            playerList.setType(PlayerListTypes.ADD);
                            playerList.setUsername(player.username);
                            playerList.setXboxID(xuid);
                            playerList.setID(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
                            playerList.setUUID(uuid);
                            playerList.writePacket(onlineplayers);
                        }
                    }
                }, 2000);

                setTimeout(() => {
                    // NOTE: We can't use FrogJS.broadcastMessage here, because we need additional logic here (if PlayerInfo...)

                    for (const playerInfo of PlayerInfo.players) {
                        if (playerInfo.username === player.username) {
                            return; // Vanilla behaviour
                        }

                        playerInfo.sendMessage(getKey("chat.broadcasts.joined").replace("%s%", playerInfo.username));
                    }
                }, 1000);
        }
    }
}

module.exports = ClientResourcePackResponsePacket;
