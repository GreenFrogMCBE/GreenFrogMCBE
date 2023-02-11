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
process.env.DEBUG = process.argv.includes("--debug")
  ? "minecraft-protocol"
  : "";

const fs = require("fs");
const bedrock = require("frog-protocol");
const ServerInfo = require("./server/ServerInfo");
const PlayerInfo = require("./player/PlayerInfo");
const PluginLoader = require("./plugin/PluginLoader");
const Text = require("./network/packets/handlers/Text");
const ValidateConfig = require("./server/ValidateConfig");
const Interact = require("./network/packets/handlers/Interact");
const ResponsePackInfo = require("./network/packets/ResponsePackInfo");
const ClientContainerClose = require("./network/packets/handlers/ClientContainerClose");
const ResourcePackClientResponse = require("./network/packets/handlers/ResourcePackClientResponse");
const RequestChunkRadius = require("./network/packets/handlers/RequestChunkRadius");
const ModalFormResponse = require("./network/packets/handlers/ModalFormResponse");
const ItemStackRequest = require("./network/packets/handlers/ItemStackRequest");
const SubChunkRequest = require("./network/packets/handlers/SubChunkRequest");
const CommandRequest = require("./network/packets/handlers/CommandRequest");
const PlayerMove = require("./network/packets/handlers/PlayerMove");
const ValidateClient = require("./player/ValidateClient");
const PlayerInit = require("./server/PlayerInit");
const Logger = require("./server/Logger");
const Events = require("./plugin/Events");

let clients = [];
let server = null;
let config = null;
let lang = null;

module.exports = {
  clients: clients,
  server: server,
  config: config,
  lang: lang,

  /**
   * It loads the JSON files into the server.
   */
  async initJson() {
    config = ServerInfo.config;
    lang = ServerInfo.lang;
  },

  /**
   * It logs the error and then exits the process
   * @param err - The error that was thrown.
   */
  async attemptToDie(err) {
    if (err.toString().includes("Server failed to start")) {
      Logger.log(
        lang.errors.failedToBind.replace(
          "%address%",
          `${config.host}:${config.port}`
        ),
        "error"
      );
      Logger.log(lang.errors.otherServerRunning, "error");
      process.exit(config.crashCode);
    } else {
      Logger.log(`Server error: \n${err.stack}`, "error");
      if (!config.unstable) process.exit(config.crashCode);
    }
  },

  /**
   * It handles packets.
   * @param client - The client that sent the packet
   * @param packet - The packet that was sent by the client
   */
  handlepk(client, packet) {
    if (client.offline) throw new Error(lang.errors.packetErrorOffline);
    switch (packet.data.name) {
      case "resource_pack_client_response":
        new ResourcePackClientResponse().handle(client, packet, this.server);
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
        new Text().handle(client, packet);
        break;
      case "subchunk_request":
        new SubChunkRequest().handle(client, packet);
        break;
      case "command_request":
        new CommandRequest().handle(client, packet);
        break;
      case "modal_form_response":
        new ModalFormResponse().handle(this.server, client, packet);
        break;
      default:
        if (config.logUnhandledPackets || process.argv.includes("--debug")) {
          Logger.log(lang.debdebug.unhandledPacket, "warning");
          console.log("%o", packet);
        }
        break;
    }
  },

  /**
   * It logs the player's IP, port, then sends the player the response pack, executes the
   * events, and sets the player's info.
   * @param client - The client that joined
   */
  async onJoin(client) {
    await ValidateClient.initAndValidateClient(client);

    PlayerInit.initPlayer(client);

    Events.executeOJ(this.server, client);

    PlayerInfo.addPlayer(client);

    const responsepackinfo = new ResponsePackInfo();
    responsepackinfo.setMustAccept(true);
    responsepackinfo.setHasScripts(false);
    responsepackinfo.setBehaviorPacks([]);
    responsepackinfo.setTexturePacks([]);
    responsepackinfo.send(client);

    client.offline = false;
  },

  /**
   * It logs a warning if the config.debug or config.unstable is true.
   */
  async initDebug() {
    if (config.unstable) Logger.log(lang.errors.unstableWarning, "warning");
    if (process.env.DEBUG === "minecraft-protocol" || config.debug)
      Logger.log(lang.errors.debugWarning, "warning");
  },

  /**
   * It loads the config, lang files, and commands, then loads the plugins and starts the server.
   */
  async start() {
    await ValidateConfig.ValidateLangFiles();

    await this.initJson();

    fs.access("ops.yml", fs.constants.F_OK, (err) => {
      if (err) {
        fs.writeFile("ops.yml", "", (err) => {
          if (err) throw err;
        });
      }
    });

    Logger.log(lang.server.loadingServer);

    process.on("uncaughtException", (err) => this.attemptToDie(err));
    process.on("uncaughtExceptionMonitor", (err) => this.attemptToDie(err));
    process.on("unhandledRejection", (err) => this.attemptToDie(err));

    await this.initDebug();

    Logger.log(`${lang.commandhander.scch}`, "debug");
    await PluginLoader.loadPlugins();

    this.listen();
  },

  /**
   * It listens for a connection, and when it gets one, it listens for a join event, and when it gets
   * one, it executes the onJoin function.
   */
  listen() {
    try {
      server = bedrock.createServer({
        host: config.host,
        port: config.port,
        version: config.version,
        offline: config.offlineMode,
        maxPlayers: config.maxPlayers,
        motd: {
          motd: config.motd,
          levelName: "GreenFrogMCBE",
        },
      });
      Logger.log(
        `${lang.server.listeningOn.replace(
          `%address%`,
          `/${config.host}:${config.port}`
        )}`
      );

      server.on("connect", (client) => {
        client.on("join", () => {
          this.onJoin(client);
        });

        client.on("packet", (packet) => {
          try {
            this.handlepk(client, packet);
          } catch (e) {
            try {
              client.kick(lang.kickmessages.internalServerError);
            } catch (e) {
              client.disconnect(lang.kickmessages.internalServerError);
            }
            Events.executeOISE(this.server, client, e);
            Logger.log(
              lang.errors.packetHandlingException
                .replace("%player%", client.username)
                .replace("%error%", e.stack),
              "error"
            );
          }
        });
      });
    } catch (e) {
      Logger.log(
        `${lang.listeningFailed
          .replace(`%address%`, `/${config.host}:${config.port}`)
          .replace("%error%", e.stack)}`,
        "error"
      );
      process.exit(config.exitCode);
    }
  },
};
