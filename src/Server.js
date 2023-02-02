/* Its the server main file. */
process.env.DEBUG = process.argv.includes("--debug")
  ? "minecraft-protocol"
  : "";

const fs = require("fs");
const bedrock = require("bedrock-protocol");
const PluginLoader = require("./plugins/Loader");
const ServerInfo = require("./server/ServerInfo");
const PlayerInfo = require("./player/PlayerInfo");
const Text = require("./network/packets/handlers/Text");
const ValidateConfig = require("./server/ValidateConfig");
const Interact = require("./network/packets/handlers/Interact");
const Unhandled = require("./network/packets/handlers/Unhandled");
const ResponsePackInfo = require("./network/packets/ResponsePackInfo");
const ClientContainerClose = require("./network/packets/handlers/ClientContainerClose");
const ResourcePackClientResponse = require("./network/packets/handlers/ResourcePackClientResponse");
const ItemStackRequest = require("./network/packets/handlers/ItemStackRequest");
const RequestChunkRadius = require("./network/packets/handlers/RequestChunkRadius");
const PlayerMove = require("./network/packets/handlers/PlayerMove");
const SubChunkRequest = require("./network/packets/handlers/SubChunkRequest");
const CommandRequest = require("./network/packets/handlers/CommandRequest");

const log = require("./server/Logger");
const Logger = new log();
const ev = require("./server/Events");
const Events = new ev();

class Server {
  constructor() {
    this.clients = [];
    this.server = null;
    this.config = null;
    this.lang = null;
    this.command = null;
  }

  /**
   * It loads the JSON files into the server.
   */
  async initJson() {
    this.config = ServerInfo.config;
    this.lang = ServerInfo.lang;
    this.commands = ServerInfo.commands;
  }

  /**
   * GetServer() {
   *         return this.server
   * }
   * @returns The server object.
   */
  getServer() {
    return this.server;
  }

  /**
   * It logs the error and then exits the process
   * @param err - The error that was thrown.
   */
  async attemptToDie(err) {
    if (err.toString().includes("Server failed to start")) {
      Logger.log(
        `Failed to bind port on ${this.config.host}:${this.config.port}`,
        "error"
      );
      Logger.log(
        `This means that another server is already running on this port`,
        "error"
      );
      process.exit(this.config.crashstatuscode);
    } else {
      Logger.log(`Server error: \n${err.stack}`, "error");
      if (!this.config.donotcrashoncriticalerrors) {
        process.exit(this.config.crashstatuscode);
      }
    }
  }

  /**
   * It handles packets.
   * @param client - The client that sent the packet
   * @param packet - The packet that was sent by the client
   */
  handlepk(client, packet) {
    if (client.q)
      throw new Error("An attempt to handle packet from offline player");
    switch (packet.data.name) {
      case "resource_pack_client_response":
        new ResourcePackClientResponse().handle(client, packet, this.server);
        break;
      case "client_to_server_handshake":
      case "emote_list":
      case "set_player_game_type":
      case "set_local_player_as_initialized":
      case "player_action":
      case "mob_equipment":
      case "client_cache_status":
        new Unhandled().handle(packet);
        break;
      case "move_player":
        new PlayerMove().handle(client, packet);
        break;
      case "item_stack_request":
        new ItemStackRequest().handle(client, packet);
        break;
      case "interact":
        new Interact().handle(packet, client);
        break;
      case "container_close":
        new ClientContainerClose().handle(client);
        break;
      case "request_chunk_radius":
        new RequestChunkRadius().handle(client);
        break;
      case "text":
        new Text().handle(client, packet, this.lang);
        break;
      case "subchunk_request":
        new SubChunkRequest().handle(client, packet);
        break;
      case "command_request":
        new CommandRequest().handle(client, packet);
        break;
      default:
        if (this.config.logunhandledpackets) {
          Logger.log(this.lang.unhandledPacket, "warning");
          console.log("%o", packet);
        }
        break;
    }
  }

  /**
   * It logs the player's IP, port, then sends the player the response pack, executes the
   * events, and sets the player's info.
   * @param client - The client that joined
   */
  async onJoin(client) {
    client.ip = client.connection.address.split("/")[0];
    client.port = client.connection.address.split("/")[1];
    client.fullip = client.connection.address;
    client.username = client.getUserData().displayName;

    Logger.log(
      this.lang.playerConnected
        .replace("%player%", client.username)
        .replace("%ip%", client.fullip)
    );

    Events.executeOJ(this.server, client);

    new PlayerInfo().addPlayer(client);
    new ResponsePackInfo().writePacket(client);
  }

  /**
   * It logs a warning if the config.debug or config.unstable is true.
   */
  async initDebug() {
    if (this.config.unstable) {
      Logger.log(this.lang.unstableWarning, "warning");
    }
    if (this.config.debug) {
      Logger.log(this.lang.debugWarning, "warning");
    }
  }

  /**
   * It loads the config, language file, and commands, then loads the plugins and starts the server.
   */
  async start() {
    await new ValidateConfig().ValidateConfig();
    await new ValidateConfig().ValidateLangFile();
    await new ValidateConfig().ValidateCommands();

    await this.initJson();

    fs.access("ops.yml", fs.constants.F_OK, (err) => {
      if (err) {
        fs.writeFile("ops.yml", "", (err) => {
          if (err) throw err;
        });
      }
    });

    Logger.log(this.lang.loadingServer);

    process.on("uncaughtException", (err) => this.attemptToDie(err));
    process.on("uncaughtExceptionMonitor", (err) => this.attemptToDie(err));
    process.on("unhandledRejection", (err) => this.attemptToDie(err));

    await this.initDebug();

    Logger.log(`${this.lang.scch}`, "debug");
    await PluginLoader.prototype.loadPlugins();

    this.listen();
  }

  /**
   * It listens for a connection, and when it gets one, it listens for a join event, and when it gets
   * one, it executes the onJoin function.
   */
  listen() {
    try {
      this.server = bedrock.createServer({
        host: this.config.host,
        port: this.config.port,
        version: this.config.version,
        offline: this.config.offlinemode,
        maxPlayers: this.config.maxplayers,
        motd: {
          motd: this.config.motd,
          levelName: "GreenFrogMCBE",
        },
      });
      Logger.log(
        `${this.lang.listeningOn.replace(
          `%ipport%`,
          `/${this.config.host}:${this.config.port}`
        )}`
      );

      this.server.on("connect", (client) => {
        client.on("join", () => {
          this.onJoin(client);
        });

        client.on("packet", (packet) => {
          try {
            this.handlepk(client, packet);
          } catch (e) {
            try {
              client.kick(this.lang.internalServerError);
            } catch (e) {
              client.disconnect(this.lang.internalServerError);
            }
            Events.executeOISE(this.server, client, e);
            Logger.log(
              this.lang.packetHandlingException
                .replace("%player%", client.username)
                .replace("%error%", e.stack),
              "error"
            );
          }
        });
      });
    } catch (e) {
      Logger.log(
        `${this.lang.listeningFailed
          .replace(`%ipport%`, `/${this.config.host}:${this.config.port}`)
          .replace("%error%", e.stack)}`,
        "error"
      );
      process.exit(this.config.exitstatuscode);
    }
  }
}

module.exports = Server;
