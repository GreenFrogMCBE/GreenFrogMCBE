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
const SoftwareInfo = require("./SoftwareInfo");
const PlayerInit = require("./server/PlayerInit");
const LogTypes = require("./server/LogTypes");
const Logger = require("./server/Logger");

let playersOnline = [];
let clients = [];
let server = null;
let config = null;
let lang = null;

module.exports = {
	clients: clients,
	server: server,
	config: config,
	lang: lang,
	majorServerVersion: SoftwareInfo.majorServerVersion,
	minorServerVersion: SoftwareInfo.minorServerVersion,
	apiVersion: SoftwareInfo.minorServerVersion,

	async _initJson() {
		config = ServerInfo.config;
		lang = ServerInfo.lang;
	},

	async _handleCriticalError(err) {
		if (err.toString().includes("Server failed to start")) {
			Logger.log(lang.errors.failedToBind.replace("%address%", `${config.host}:${config.port}`), "error");
			Logger.log(lang.errors.otherServerRunning, LogTypes.ERROR);
			process.exit(config.crashCode);
		} else {
			Logger.log(`Server error: \n${err.stack}`, LogTypes.ERROR);
			if (!config.unstable) process.exit(config.crashCode);
		}
	},

	_handlepk(client, packet) {
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

	async _onJoin(client) {
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

	async _initDebug() {
		if (config.unstable) Logger.log(lang.devdebug.unstableWarning, LogTypes.WARNING);
		if (process.env.DEBUG === "minecraft-protocol" || config.debug) Logger.log(lang.errors.debugWarning, LogTypes.WARNING);
	},

	async start() {
		await this._initJson();

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

		await this._initDebug();

		await PluginLoader.loadPlugins();

		this._listen();
	},

	_listen() {
		try {
			server = bedrock.createServer({
				host: config.host,
				port: config.port,
				version: config.version,
				offline: config.offlineMode,
				maxPlayers: config.maxPlayers,
				motd: {
					motd: config.motd,
					levelName: "GreenFrog",
				},
			});
			Logger.log(`${lang.server.listeningOn.replace(`%address%`, `/${config.host}:${config.port}`)}`);

			server.on("connect", (client) => {
				client.on("join", () => {
					this._onJoin(client);
				});

				client.on("packet", (packet) => {
					try {
						this._handlepk(client, packet);
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


	/**
	 * Shutdowns the server.
	 */
	async shutdown() {
		await require("./server/ConsoleCommandSender").close();
		Logger.log(lang.server.stoppingServer);

		try {
			for (const player of PlayerInfo.players) {
				if (!player.offline) player.kick(lang.kickmessages.serverShutdown);
			}
		} catch (e) {
			/* ignored */
		}

		setTimeout(() => {
			PluginLoader.unloadPlugins();
		}, 1000);
	},

	_addPlayer(player) {
		playersOnline.push(player);
	},

	/**
	 * Returns the player
	 * @param {Object} player
	 * @returns The player if the player is online, null otherwise.
	 */
	getPlayer(player) {
		try {
			for (let i = 0; i < playersOnline.length; i++) {
				if (playersOnline[i].username === player) {
					return playersOnline[i];
				}
			}
		} catch (e) {
			return null;
		}
	},
};
