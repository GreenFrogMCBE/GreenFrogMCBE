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
const Events = require("../../../server/Events");
const ServerInfo = require("../../../server/ServerInfo");
const PlayerInfo = require("../../../player/PlayerInfo");
const Respawn = require("../../../network/packets/Respawn");
const StartGame = require("../../../network/packets/StartGame");
const PlayerList = require("../../../network/packets/PlayerList");
const LevelChunk = require("../../../network/packets/LevelChunk");
const PlayStatus = require("../../../network/packets/PlayStatus");
const ClientDisconnect = require("../exceptions/ClientDisconnect");
const UpdateBlock = require("../../../network/packets/UpdateBlock");
const CreativeContent = require("../../../network/packets/CreativeContent");
const ResourcePackStack = require("../../../network/packets/ResourcePackStack");
const ClientCacheStatus = require("../../../network/packets/ClientCacheStatus");
const SetCommandsEnabled = require("../../../network/packets/SetCommandsEnabled");
const BiomeDefinitionList = require("../../../network/packets/BiomeDefinitionList");
const AvailableEntityIdentifiers = require("../../../network/packets/AvailableEntityIdentifiers");
const NetworkChunkPublisherUpdate = require("../../../network/packets/NetworkChunkPublisherUpdate");
const CommandShutdown = require("../../../server/commands/CommandShutdown");
const CommandVersion = require("../../../server/commands/CommandVersion");
const Dimension = require("../../../network/packets/types/Dimension");
const CommandSay = require("../../../server/commands/CommandSay");
const CommandManager = require("../../../player/CommandManager");
const CommandPl = require("../../../server/commands/CommandPl");
const CommandOp = require("../../../server/commands/CommandOp");
const Biome = require("../../../network/packets/types/Biome");
const config = require("../../../server/ServerInfo").config;
const PlayerInit = require("../../../server/PlayerInit");
const PlayStatuses = require("../types/PlayStatuses");
const Difficulty = require("../types/Difficulty");
const Logger = require("../../../server/Logger");
const Generator = require("../types/Generator");
const lang = ServerInfo.lang;
const fs = require("fs");

class ResourcePackClientResponse extends Handler {
  handle(client, packet, server) {
    switch (packet.data.params.response_status) {
      case "none": {
        Events.executePHNRPI(server, client);
        Logger.log(lang.noRpsInstalled.replace("%player%", client.username));
        break
      }
      case "refused": {
        Events.executeFTEORPF(server, client);
        Logger.log(lang.rpsrefused.replace("%player%", client.username));
        throw new ClientDisconnect(lang.resourcePacksRefused);
      }
      case "have_all_packs": {
        Events.executeFTEOPHAP(server, client);
        Logger.log(lang.rpsInstalled.replace("%player%", client.username));

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
      case "completed":
        {
          Events.executeFTEOK(server, client);

          const ops = fs.readFileSync("ops.yml", "utf8").split("\n");

          for (const op of ops) {
            if (op.replace("\r", "") === client.username) {
              client.op = true;
              client.permlevel = 4;
              break;
            }
          }

          if (!client.op) client.permlevel = config.default_permission_level;

          Logger.log(lang.joined.replace("%player%", client.username));

          PlayerInit.initPlayer(client);

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
          startgame.setWorldGamemode(config.world_gamemode);
          startgame.setDifficulty(Difficulty.NORMAL);
          startgame.setSpawnPosition(0, 100, 0);
          startgame.setPlayerPermissionLevel(client.permlevel);
          startgame.send(client);

          const commandsenabled = new SetCommandsEnabled();
          commandsenabled.setEnabled(true);
          commandsenabled.send(client);

          const biomedeflist = new BiomeDefinitionList();
          biomedeflist.setNBT(require("../res/biomes.json"));
          biomedeflist.send(client);

          const availableentityids = new AvailableEntityIdentifiers();
          availableentityids.setNBT(require("../res/entities.json"));
          availableentityids.send(client);

          const creativecontent = new CreativeContent();
          creativecontent.setItems(
            require("../res/creativecontent.json").content
          );
          creativecontent.send(client);

          const respawn = new Respawn();
          respawn.setX(0);
          respawn.setY(100);
          respawn.setZ(0);
          respawn.setState(0);
          respawn.setRuntimeEntityId(0);
          respawn.send(client);

          const clientcachestatus = new ClientCacheStatus();
          clientcachestatus.setEnabled(true);
          clientcachestatus.send(client);

          const commandmanager = new CommandManager();
          commandmanager.init(client);
          commandmanager.addCommand(
            client,
            new CommandVersion().name(),
            new CommandVersion().getPlayerDescription()
          );
          commandmanager.addCommand(
            client,
            new CommandVersion().aliases()[0],
            new CommandVersion().getPlayerDescription()
          );
          commandmanager.addCommand(
            client,
            new CommandPl().name(),
            new CommandPl().getPlayerDescription()
          );
          commandmanager.addCommand(
            client,
            new CommandPl().aliases()[0],
            new CommandPl().getPlayerDescription()
          );
          if (client.op) {
            commandmanager.addCommand(
              client,
              new CommandShutdown().name(),
              new CommandShutdown().getPlayerDescription()
            );
            commandmanager.addCommand(
              client,
              new CommandSay().name(),
              new CommandSay().getPlayerDescription()
            );
            commandmanager.addCommand(
              client,
              new CommandOp().name(),
              new CommandOp().getPlayerDescription()
            );
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

          if (config.render_chunks) {
            for (let x = 0; x < 10; x++) {
              for (let z = 0; z < 10; z++) {
                const block = new UpdateBlock();
                block.setX(x);
                block.setY(98);
                block.setZ(z);
                block.setBlockRuntimeId(2);
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

          Logger.log(lang.spawned.replace("%player%", client.username));
          setTimeout(() => {
            if (!client.offline) {
              const ps = new PlayStatus();
              ps.setStatus(PlayStatuses.PLAYERSPAWN);
              ps.send(client);
              Events.executeOPS(server, client);
            }
          }, 2000);

          setTimeout(() => {
            if (!client.offline) return;
            for (let i = 0; i < new PlayerInfo().getPlayers().length; i++) {
              new PlayerInfo()
                .getPlayers()[i].sendMessage(
                  lang.joinedTheGame.replace("%username%", client.username)
                );
            }
          }, 1000);
        }
        break;
      default:
        if (config.logunhandledpackets)
          Logger.log(
            lang.unhandledPacketData.replace(
              "%data%",
              packet.data.params.response_status
            )
          );
    }
  }
}

module.exports = ResourcePackClientResponse;
