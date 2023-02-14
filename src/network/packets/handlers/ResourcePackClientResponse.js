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
const Handler = require("./Handler");
const PlayerInfo = require("../../../player/PlayerInfo");
const Respawn = require("../../../network/packets/Respawn");
const StartGame = require("../../../network/packets/StartGame");
const PlayerList = require("../../../network/packets/PlayerList");
const LevelChunk = require("../../../network/packets/LevelChunk");
const PlayStatus = require("../../../network/packets/PlayStatus");
const UpdateBlock = require("../../../network/packets/UpdateBlock");
const PlayerSpawnEvent = require("../../../plugin/events/PlayerSpawnEvent")
const CreativeContent = require("../../../network/packets/CreativeContent");
const PlayerHasAllPacks = require("../../../plugin/events/PlayerHasAllPacks")
const ResourcePackStack = require("../../../network/packets/ResourcePackStack");
const ClientCacheStatus = require("../../../network/packets/ClientCacheStatus");
const SetCommandsEnabled = require("../../../network/packets/SetCommandsEnabled");
const BiomeDefinitionList = require("../../../network/packets/BiomeDefinitionList");
const PlayerResourcePacksRefused = require('../../../plugin/events/PlayerResourcePacksRefused')
const AvailableEntityIdentifiers = require("../../../network/packets/AvailableEntityIdentifiers");
const NetworkChunkPublisherUpdate = require("../../../network/packets/NetworkChunkPublisherUpdate");
const PlayerResourcePacksCompletedEvent = require("../../../plugin/events/PlayerResourcePacksCompletedEvent")
const PlayerHasNoResourcePacksInstalledEvent = require("../../../plugin/events/PlayerHasNoResourcePacksInstalledEvent")
const CommandShutdown = require("../../../server/commands/CommandShutdown");
const CommandVersion = require("../../../server/commands/CommandVersion");
const VersionToProtocol = require("../../../server/VersionToProtocol");
const Dimension = require("../../../network/packets/types/Dimension");
const CommandKick = require("../../../server/commands/CommandKick");
const CommandTime = require("../../../server/commands/CommandTime");
const CommandSay = require("../../../server/commands/CommandSay");
const CommandManager = require("../../../player/CommandManager");
const CommandPl = require("../../../server/commands/CommandPl");
const CommandOp = require("../../../server/commands/CommandOp");
const { config, lang } = require("../../../server/ServerInfo");
const Biome = require("../../../network/packets/types/Biome");
const PlayStatuses = require("../types/PlayStatuses");
const Difficulty = require("../types/Difficulty");
const Logger = require("../../../server/Logger");
const Generator = require("../types/Generator");
const fs = require("fs");

class ResourcePackClientResponse extends Handler {
  handle(client, packet, server) {
    if (!(client.version === VersionToProtocol.getProtocol(config.version)) && !config.multiProtocol) {
      client.kick(lang.kickmessages.versionMismatch.replace("%version%", config.version));
      return;
    }

    switch (packet.data.params.response_status) {
      case "none": {
        new PlayerHasNoResourcePacksInstalledEvent().execute(server, client)
        Logger.log(lang.playerstatuses.noRpsInstalled.replace("%player%", client.username));
        break;
      }
      case "refused": {
        new PlayerResourcePacksRefused().execute(server, client)
        Logger.log(lang.playerstatuses.rpsrefused.replace("%player%", client.username));
        client.kick(lang.resourcePacksRefused);
        break
      }
      case "have_all_packs": {
        new PlayerHasAllPacks().execute(server, client)
        Logger.log(lang.playerstatuses.rpsInstalled.replace("%player%", client.username));

        const resourcepackstack = new ResourcePackStack();
        resourcepackstack.setMustAccept(false);
        resourcepackstack.setBehaviorPacks([]);
        resourcepackstack.setResourcePacks([]);
        resourcepackstack.setGameVersion("");
        resourcepackstack.setExperiments([]);
        resourcepackstack.setExperimentsPreviouslyUsed(false);
        resourcepackstack.send(client);
        break;
      }
      case "completed": {
        new PlayerResourcePacksCompletedEvent().execute(server, client)

        const ops = fs.readFileSync("ops.yml", "utf8").split("\n");

        for (const op of ops) {
          if (op.replace("\r", "") === client.username) {
            client.op = true;
            client.permlevel = 4;
            break;
          }
        }

        if (!client.op) client.permlevel = config.defaultPermissionLevel;

        Logger.log(lang.playerstatuses.joined.replace("%player%", client.username));

        const playerlist = new PlayerList();
        playerlist.setUsername(client.username);
        playerlist.send(client);

        const startgame = new StartGame();
        startgame.setEntityId(0);
        startgame.setRunTimeEntityId(0);
        startgame.setGamemode(config.gamemode);
        startgame.setPlayerPosition(0, 100, 0);
        startgame.setPlayerRotation(0, 0);
        startgame.setSeed(-1);
        startgame.setBiomeType(0);
        startgame.setBiomeName(Biome.PLAINS);
        startgame.setDimension(Dimension.OVERWORLD);
        startgame.setGenerator(Generator.FLAT);
        startgame.setWorldGamemode(config.worldGamemode);
        startgame.setDifficulty(Difficulty.NORMAL);
        startgame.setSpawnPosition(0, 100, 0);
        startgame.setPlayerPermissionLevel(client.permlevel);
        startgame.send(client);

        const commandsenabled = new SetCommandsEnabled();
        commandsenabled.setEnabled(true);
        commandsenabled.send(client);

        const biomedeflist = new BiomeDefinitionList();
        biomedeflist.setNBT(
          require("../res/biomes.json")
        );
        biomedeflist.send(client);

        const availableentityids = new AvailableEntityIdentifiers();
        availableentityids.setNBT(
          require("../res/entities.json")
        );
        availableentityids.send(client);

        const creativecontent = new CreativeContent();
        creativecontent.setItems(
          require("../res/creativecontent.json").content
        );
        creativecontent.send(client);

        const respawn = new Respawn();
        respawn.setPosition(0, 100, 0);
        respawn.setState(0);
        respawn.setRuntimeEntityId(0);
        respawn.send(client);

        const clientcachestatus = new ClientCacheStatus();
        clientcachestatus.setEnabled(true);
        clientcachestatus.send(client);

        const commandmanager = new CommandManager();
        commandmanager.init(client);
        if (config.playerCommandVersion) {
          commandmanager.addCommand(
            client,
            new CommandVersion().name().toLowerCase(),
            new CommandVersion().getPlayerDescription()
          );
          commandmanager.addCommand(
            client,
            new CommandVersion().aliases()[0].toLowerCase(),
            new CommandVersion().getPlayerDescription()
          );
        }
        if (config.playerCommandPlugins) {
          commandmanager.addCommand(
            client,
            new CommandPl().name().toLowerCase(),
            new CommandPl().getPlayerDescription()
          );
          commandmanager.addCommand(
            client,
            new CommandPl().aliases()[0].toLowerCase(),
            new CommandPl().getPlayerDescription()
          );
        }
        if (client.op) {
          if (config.playerCommandStop) {
            commandmanager.addCommand(
              client,
              new CommandShutdown().name().toLowerCase(),
              new CommandShutdown().getPlayerDescription()
            );
          }
          if (config.playerCommandSay) {
            commandmanager.addCommand(
              client,
              new CommandSay().name().toLowerCase(),
              new CommandSay().getPlayerDescription()
            );
          }
          if (config.playerCommandOp) {
            commandmanager.addCommand(
              client,
              new CommandOp().name().toLowerCase(),
              new CommandOp().getPlayerDescription()
            );
          }
          if (config.playerCommandKick) {
            commandmanager.addCommand(
              client,
              new CommandKick().name().toLowerCase(),
              new CommandKick().getPlayerDescription()
            );
          }
          if (config.playerCommandTime) {
            commandmanager.addCommand(
              client,
              new CommandTime().name().toLowerCase(),
              new CommandTime().getPlayerDescription()
            );
          }
        }

        const chunk = new LevelChunk();
        chunk.setX(0);
        chunk.setZ(0);
        chunk.setSubChunkCount(0);
        chunk.setCacheEnabled(false);
        chunk.setPayload([
          1, 88, 1, 88, 1, 88, 1, 88, 1, 88, 1, 88, 1, 88, 1, 88, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 0,
        ]);
        chunk.send(client);

        const block = new UpdateBlock();
        block.setX(-1);
        block.setY(98);
        block.setZ(0);
        block.setNeighbors(true)
        block.setNetwork(true)
        block.setFlagsValue(3)
        block.setBlockRuntimeId(0);
        block.send(client);
        if (config.renderChunks) {
          for (let x = 0; x < 10; x++) {
            for (let z = 0; z < 10; z++) {
              const block = new UpdateBlock();
              block.setX(x);
              block.setY(98);
              block.setZ(z);
              block.setNeighbors(true)
              block.setNetwork(true)
              block.setFlagsValue(3)
              block.setBlockRuntimeId(Math.floor(Math.random() * 100));
              block.send(client);
            }
          }
        }

        setInterval(() => {
          if (!client.offline) {
            const networkchunkpublisher = new NetworkChunkPublisherUpdate();
            networkchunkpublisher.setCords(0, 0, 0);
            networkchunkpublisher.setRadius(64);
            networkchunkpublisher.setSavedChunks([]);
            networkchunkpublisher.send(client);
          }
        }, 50);

        Logger.log(
          lang.playerstatuses.spawned.replace("%player%", client.username)
        );
        setTimeout(() => {
          if (!client.offline) {
            const ps = new PlayStatus();
            ps.setStatus(PlayStatuses.PLAYERSPAWN);
            ps.send(client);
            new PlayerSpawnEvent().execute(server, client)
          }
        }, 2000);

        setTimeout(() => {
          if (client.offline) return;
          for (let i = 0; i < PlayerInfo.players.length; i++) {
            PlayerInfo.players[i].sendMessage(lang.broadcasts.joinedTheGame.replace("%username%", client.username));
          }
        }, 1000);
      }
        break;
      default:
        if (config.logUnhandledPackets)
          Logger.log(
            lang.debugdev.unhandledPacket.replace(
              "%data%",
              packet.data.params.response_status
            )
          );
    }
  }
}

module.exports = ResourcePackClientResponse;
