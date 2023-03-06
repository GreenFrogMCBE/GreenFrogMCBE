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
process.env.DEBUG = process.argv.includes("--debug") ? "minecraft-protocol" : "";

const fs = require("fs");
const bedrock = require("frog-protocol");
const ServerInfo = require("./server/ServerInfo");
const PlayerInfo = require("./player/PlayerInfo");
const PluginLoader = require("./plugin/PluginLoader");
const Text = require("./network/packets/handlers/Text");
const Interact = require("./network/packets/handlers/Interact");
const ResponsePackInfo = require("./network/packets/ResponsePackInfo");
const ClientContainerClose = require("./network/packets/handlers/ClientContainerClose");
const ResourcePackClientResponse = require("./network/packets/handlers/ResourcePackClientResponse");
const ServerInternalServerErrorEvent = require("./plugin/events/ServerInternalServerErrorEvent");
const InventoryTransaction = require("./network/packets/handlers/InventoryTransaction");
const ModalFormResponse = require("./network/packets/handlers/ModalFormResponse");
const ItemStackRequest = require("./network/packets/handlers/ItemStackRequest");
const CommandRequest = require("./network/packets/handlers/CommandRequest");
const PlayerMove = require("./network/packets/handlers/PlayerMove");
const PlayerJoinEvent = require("./plugin/events/PlayerJoinEvent");
const VersionToProtocol = require("./server/VersionToProtocol");
const ValidateClient = require("./player/ValidateClient");
const PlayerInit = require("./server/PlayerInit");
const LogTypes = require("./server/LogTypes");
const Logger = require("./server/Logger");

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
			Logger.log(lang.errors.failedToBind.replace("%address%", `${config.host}:${config.port}`), "error");
			Logger.log(lang.errors.otherServerRunning, LogTypes.ERROR);
			process.exit(config.crashCode);
		} else {
			Logger.log(`Server error: \n${err.stack}`, LogTypes.ERROR);
			if (!config.unstable) process.exit(config.crashCode);
		}
	},

	/**
	 * Packet handler
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
			case "text":
				new Text().handle(client, packet);
				break;
			case "command_request":
				new CommandRequest().handle(client, packet);
				break;
			case "modal_form_response":
				new ModalFormResponse().handle(this.server, client, packet);
				break;
			case "inventory_transaction":
				new InventoryTransaction().handle(this.server, client, packet);
				break;
			default:
				if (config.logUnhandledPackets) {
					Logger.log(lang.devdebug.unhandledPacket, LogTypes.WARNING);
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
		await PlayerInit.initPlayer(client);
		await ValidateClient.initAndValidateClient(client);

		const event = new PlayerJoinEvent();
		event.execute(server, client);

		PlayerInfo.addPlayer(client);

		if (PlayerInfo.players.length > config.maxPlayers) {
			client.kick(lang.kickmessages.serverFull);
			return;
		}

		if (!(client.version === VersionToProtocol.getProtocol(config.version)) && !config.multiProtocol) {
			client.kick(lang.kickmessages.versionMismatch.replace("%version%", config.version));
			return;
		}
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
		if (config.unstable) Logger.log(lang.devdebug.unstableWarning, LogTypes.WARNING);
		if (process.env.DEBUG === "minecraft-protocol" || config.debug) Logger.log(lang.errors.debugWarning, LogTypes.WARNING);
	},

	/**
	 * It loads the config, lang files, and commands, then loads the plugins and starts the server.
	 */
	async start() {
		await this.initJson();

		if (!fs.existsSync("ops.yml")) {
			fs.writeFile("ops.yml", "", (err) => {
				if (err) throw err;
			});
		}

		if (!fs.existsSync("world")) fs.mkdirSync("world");

		Logger.log(lang.server.loadingServer);

		process.on("uncaughtException", (err) => this.attemptToDie(err));
		process.on("uncaughtExceptionMonitor", (err) => this.attemptToDie(err));
		process.on("unhandledRejection", (err) => this.attemptToDie(err));

		await this.initDebug();

		Logger.log(`${lang.commandhander.scch}`, LogTypes.DEBUG);
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
			Logger.log(`${lang.server.listeningOn.replace(`%address%`, `/${config.host}:${config.port}`)}`);

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
						new ServerInternalServerErrorEvent().execute(server, e);
						Logger.log(lang.errors.packetHandlingException.replace("%player%", client.username).replace("%error%", e.stack), LogTypes.ERROR);
					}
				});
			});
		} catch (e) {
			Logger.log(`${lang.errors.listeningFailed.replace(`%address%`, `/${config.host}:${config.port}`).replace("%error%", e.stack)}`, LogTypes.ERROR);
			process.exit(config.exitCode);
		}
	},
};
