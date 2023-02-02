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
const CommandSay = require("../../../server/commands/CommandSay");
const CommandManager = require("../../../player/CommandManager");
const CommandPl = require("../../../server/commands/CommandPl");
const CommandOp = require("../../../server/commands/CommandOp");
const config = require("../../../server/ServerInfo").config;
const PlayerInit = require("../../../server/PlayerInit");
const log = require("../../../server/Logger");
const lang = ServerInfo.lang;
const Logger = new log();
const fs = require("fs");

class ResourcePackClientResponse extends Handler {
  async handle(client, packet, server) {
    switch (packet.data.params.response_status) {
      case "none": {
        new Events().executePHNRPI(server, client);
        Logger.log(lang.noRpsInstalled.replace("%player%", client.username));
      }
      case "refused": {
        new Events().executeFTEORPF(server, client);
        Logger.log(lang.rpsrefused.replace("%player%", client.username));
        throw new ClientDisconnect(lang.resourcePacksRefused);
      }
      case "have_all_packs": {
        new Events().executeFTEOPHAP(server, client);
        Logger.log(lang.rpsInstalled.replace("%player%", client.username));
        new ResourcePackStack().writePacket(client);
        break;
      }
      case "completed": {
        if (client.username.includes(" ")) {
          new Logger().log(
            lang.invalidUsernameWarning.replace("%player%", client.username),
            "warning"
          );
          client.usernameold = client.username;
          client.username = client.username.replace(" ", "_");
        }

        new Events().executeFTEOK(server, client);
        if (client.username.length < 3) {
          throw new ClientDisconnect(lang.usernameIsTooShort);
        }

        if (client.username.length > 16) {
          throw new ClientDisconnect(lang.usernameIsTooLong);
        }

        let ops = fs.readFileSync("ops.yml", "utf8").split("\n");
        for (let i = 0; i < ops.length; i++) {
          if (ops[i] == client.username) {
            client.op = true;
            client.permlevel = 4;
          } else {
            client.op = false;
            client.permlevel = config.default_permission_level;
          }
        }

        Logger.log(lang.joined.replace("%player%", client.username));
        new PlayerList().writePacket(client, client.username);
        new StartGame().writePacket(
          client,
          config.gamemode,
          config.world_gamemode,
          client.permlevel
        );
        new SetCommandsEnabled().writePacket(client);
        new BiomeDefinitionList().writePacket(client);
        new AvailableEntityIdentifiers().writePacket(client);
        new CreativeContent().writePacket(client);
        new Respawn().writePacket(client);
        new ClientCacheStatus().writePacket(client);

        new PlayerInit().initPlayer(client);

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

        new LevelChunk().writePacket(client);

        if (config.render_chunks) {
          new UpdateBlock().writePacket(client, 0, 98, 0, 2);
          for (let x = 0; x < 10; x++) {
            for (let z = 0; z < 10; z++) {
              new UpdateBlock().writePacket(client, x, 98, z, 2);
            }
          }
        }

        setInterval(() => {
          if (!client.offline)
            new NetworkChunkPublisherUpdate().writePacket(client);
        }, 50);

        Logger.log(lang.spawned.replace("%player%", client.username));
        setTimeout(() => {
          if (!client.offline) new PlayStatus().writePacket(client);
          new Events().executeOPS(server, client);
        }, 2000);

        setTimeout(() => {
          if (client.offline) return;
          for (let i = 0; i < new PlayerInfo().getPlayers().length; i++) {
            new PlayerInfo()
              .getPlayers()
              [i].sendMessage(
                lang.joinedTheGame.replace("%username%", client.username)
              );
          }
        }, 1000);
        break;
      }
      default: {
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
}

module.exports = ResourcePackClientResponse;
