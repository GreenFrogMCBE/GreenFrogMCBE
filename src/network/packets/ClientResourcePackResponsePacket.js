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
const StartGame = require("./ServerStartGamePacket");
const PlayerList = require("./ServerPlayerListPacket");
const PlayStatus = require("./ServerPlayStatusPacket");
const PlayerInfo = require("../../api/PlayerInfo");
const PacketConstructor = require("./PacketConstructor");
const CreativeContent = require("./ServerCreativeContentPacket");
const PlayerSpawnEvent = require("../../events/PlayerSpawnEvent");
const ResourcePackStack = require("./ServerResourcePackStackPacket");
const ClientCacheStatus = require("./ServerClientCacheStatusPacket");
const SetCommandsEnabled = require("./ServerSetCommandsEnabledPacket");
const PacketHandlingError = require("./exceptions/PacketHandlingError")
const BiomeDefinitionList = require("./ServerBiomeDefinitionListPacket");
const PlayerHasAllPacksEvent = require("../../events/PlayerHasAllPacksEvent");
const AvailableEntityIdentifiers = require("./ServerAvailableEntityIdentifiersPacket");
const NetworkChunkPublisherUpdate = require("./ServerNetworkChunkPublisherUpdatePacket");
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
        return "resource_pack_client_response"
    }

    /**
     * Returns if is the packet critical?
     * @returns {Boolean} Returns if the packet is critical
     */
    isCriticalPacket() {
        return true
    }

    /**
     * Validates the packet
     * @param {ResourcePackStatus} response_status
     */
    async validatePacket(response_status) {
        const valid = [
            ResourcePackStatus.NONE,
            ResourcePackStatus.REFUSED,
            ResourcePackStatus.HAVEALLPACKS,
            ResourcePackStatus.COMPLETED
        ];

        if (!valid.includes(response_status)) {
            throw new PacketHandlingError("Invalid resource pack status! " + response_status)
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
                const noRpsInstalled = new PlayerHasNoResourcePacksInstalledEvent()
                noRpsInstalled.execute(
                    server,
                    player
                );

                Logger.info(lang.playerstatuses.noRpsInstalled.replace("%player%", player.username));
                break;
            case ResourcePackStatus.REFUSED:
                const refusedInstalled = new PlayerResourcePacksRefusedEvent()
                refusedInstalled.execute(
                    server,
                    player
                );

                Logger.info(lang.playerstatuses.rpsrefused.replace("%player%", player.username));
                player.kick(lang.kickmessages.resourcePacksRefused);
                break;
            case ResourcePackStatus.HAVEALLPACKS: {
                const hasAllPacks = new PlayerHasAllPacksEvent()
                hasAllPacks.execute(
                    server,
                    player
                );

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
                const completeEvent = new PlayerResourcePacksCompletedEvent()
                completeEvent.execute(
                    server,
                    player
                );

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

                const clientLocalWorld = new DefaultWorld();
                clientLocalWorld.setChunkRadius(require("../../../world/world_settings").chunkLoadRadius)
                clientLocalWorld.setName(require("../../../world/world_settings.json").worldName)
                if (config.generator === WorldGenerator.FLAT) {
                    clientLocalWorld.setSpawnCoordinates(0, -58, 0);
                } else if (config.generator === WorldGenerator.DEFAULT) {
                    clientLocalWorld.setSpawnCoordinates(1070, 139, -914);
                } else if (config.generator === WorldGenerator.VOID) {
                    clientLocalWorld.setSpawnCoordinates(0, 100, 0);
                } else {
                    throw new ChunkError(lang.errors.failedToLoadWorld_InvalidGenerator);
                }

                const startgame = new StartGame();
                startgame.setEntityId(0);
                startgame.setRunTimeEntityId(0);
                startgame.setGamemode(config.gamemode);
                startgame.setPlayerPosition(clientLocalWorld.getSpawnCoordinates().x, clientLocalWorld.getSpawnCoordinates().y, clientLocalWorld.getSpawnCoordinates().z);
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
                startgame.setWorldName(clientLocalWorld.getName());
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

                const playerlist = new PlayerList();
                playerlist.setUsername(player.username);
                playerlist.writePacket(player);

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
                    chunkradiusupdate.setChunkRadius(clientLocalWorld.getChunkRadius());
                    chunkradiusupdate.writePacket(player);

                    const cords = config.generator === WorldGenerator.DEFAULT ? {
                        x: 1070,
                        y: 274,
                        z: -915
                    } : {
                        x: -17,
                        y: 117,
                        z: 22
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
                        const networkchunkpublisher = new NetworkChunkPublisherUpdate();
                        networkchunkpublisher.setCords(cords.x, cords.y, cords.z);
                        networkchunkpublisher.setRadius(require("../../../world/world_settings.json").networkChunkLoadRadius);
                        networkchunkpublisher.setSavedChunks([]);
                        networkchunkpublisher.writePacket(player);
                    }, 4500);
                }

                setTimeout(() => {
                    for (const player of PlayerInfo.players) {
                        if (player.username !== player.username) {
                            ServerInfo.addPlayer();
                            const pl = new PlayerList();
                            pl.setType(PlayerListTypes.ADD);
                            pl.setUsername(player.username);
                            pl.setId(Math.floor(Math.random() * 99999999999));
                            pl.setUuid(player.profile.uuid);
                            pl.writePacket(player);
                        }
                    }
                }, 1000);

                Logger.info(lang.playerstatuses.spawned.replace("%player%", player.username));

                setTimeout(() => {
                    if (player.offline) return;

                    const ps = new PlayStatus();
                    ps.setStatus(PlayStatusType.PLAYERSPAWN);
                    ps.writePacket(player);

                    const spawnevent = new PlayerSpawnEvent()
                    spawnevent.execute(
                        server,
                        player
                    );

                    player.setEntityData("can_climb", true)
                    player.setEntityData("can_fly", false)
                    player.setEntityData("walker", true)
                    player.setEntityData("moving", true)
                    player.setEntityData("breathing", true)
                    player.setEntityData("has_collision", true)
                    player.setEntityData("affected_by_gravity", true)
                }, 2000);

                setTimeout(() => {
                    if (player.offline) return;
                    for (let i = 0; i < PlayerInfo.players.length; i++) {
                        if (PlayerInfo.players[i].username == player.username) return; // Vanilla behaviour
                        PlayerInfo.players[i].writePacketMessage(lang.broadcasts.joinedTheGame.replace("%username%", player.username));
                    }
                }, 1000);
        }
    }
}

module.exports = ClientResourcePackResponsePacket;
