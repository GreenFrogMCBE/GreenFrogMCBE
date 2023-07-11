/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Frog = require("../../Frog");

const PlayerInfo = require("../../api/player/PlayerInfo");
const PlayerInit = require("../../player/PlayerInit");
const Language = require("../../utils/Language");

const ResponsePackInfo = require("../../network/packets/ServerResponsePackInfoPacket");
const PlayStatus = require("../../network/packets/types/PlayStatus");
const VersionToProtocol = require("../../utils/VersionToProtocol");

const UsernameValidator = require("../../player/UsernameValidator");

let server = null;
let config = Frog.serverConfigurationFiles.config;

class PlayerJoinHandler {
	/**
	 * Executes when a player joins the server.
	 *
	 * @param {import('frog-protocol').Client} client - The client joining the server.
	 */
	async onPlayerJoin(client) {
		await this.setupClientProperties(client);
		await this.initPlayer(client);

		this.validateUsername(client);
		this.setupClientIntervals(client);
		this.addPlayer(client);
		this.handleMaxPlayers(client);
		this.handleVersionMismatch(client);
		this.sendResponsePackInfo(client);
		this.emitPlayerJoinEvent(client);
	}

	/**
	 * Validates the username of the client
	 *
	 * @param {import('frog-protocol').Client} client
	 */
	validateUsername(client) {
		if (!UsernameValidator.isUsernameValid(client.username) && config.dev.validateUsernames) {
			client.kick(Language.getKey("kickMessages.invalidUsername"));
			return;
		}
	}

	/**
	 * Setups events for the client
	 *
	 * @param {import('frog-protocol').Client} client
	 */
	async setupEvents(client) {
		Frog.eventEmitter.emit("playerPreConnectEvent", {
			player: client,
			server: this,
			cancel: (reason = Language.getKey("kickMessages.serverDisconnect")) => {
				client.kick(reason);
			},
		});

		client.__queue = client.queue;
		client.queue = (packetName, data) => {
			let shouldQueue = true;

			Frog.eventEmitter.emit("packetQueue", {
				player: client,
				server: this,
				packetName,
				packetData: data,
				cancel: () => {
					shouldQueue = false;
				},
			});

			if (shouldQueue) {
				client.__queue(packetName, data);
			}
		};
	}

	/**
	 * Initialises the player.
	 *
	 * @param {import('frog-protocol').Client} client - The client to initialize.
	 * @returns {Promise<void>}
	 */
	async initPlayer(client) {
		await PlayerInit.initPlayer(client, server);
	}

	/**
	 * Sets up the client properties.
	 *
	 * @param {import('frog-protocol').Client} client - The client to set up properties for.
	 */
	setupClientProperties(client) {
		Object.assign(client, {
			items: [],
			location: {
				x: 0,
				y: -47,
				z: 0,
				onGround: false,
				pitch: 0,
				yaw: 0,
				previous: {},
			},
			inventory: {
				lastKnownItemNetworkId: 0,
				lastKnownItemRuntimeId: 0,
				items: [],
				container: {
					window: {
						id: null,
						type: null,
					},
					blockPosition: {
						x: null,
						y: null,
						z: null,
					},
					isOpen: false,
				},
			},
			offline: false,
			kicked: false,
			health: 20,
			hunger: 20,
			packetCount: 0,
			username: client.profile.name,
			gamemode: Frog.serverConfigurationFiles.config.world.gamemode,
			world: null,
			op: null,
			dead: false,
			chunksEnabled: true,
			networkChunksLoop: null,
			hungerLossLoop: null,
			initialised: false,
			isConsole: false,
			fallDamageQueue: 0,
			ip: client.connection.address.split("/")[0],
			port: client.connection.address.split("/")[1],
		});
	}

	/**
	 * Sets up client intervals.
	 *
	 * @param {import('frog-protocol').Client} client - The client to set up intervals for.
	 */
	setupClientIntervals(client) {
		setInterval(() => {
			client.packetCount = 0;
		}, 1000);
	}

	/**
	 * Adds the player to the player list.
	 *
	 * @param {import('frog-protocol').Client} client - The client to add to the player list.
	 */
	addPlayer(client) {
		PlayerInfo.addPlayer(client);
	}

	/**
	 * Handles the case when the maximum number of players is reached.
	 *
	 * @param {import('frog-protocol').Client} client - The client to check against the maximum player count.
	 */
	handleMaxPlayers(client) {
		if (PlayerInfo.players.length > config.maxPlayers) {
			const kickMessage = config.dev.useLegacyServerFullKickMessage ? Language.getKey("kickMessages.serverFull") : PlayStatus.FAILED_SERVER_FULL;
			client.kick(kickMessage);
			return;
		}
	}

	/**
	 * Handles the version mismatch between the client and server.
	 *
	 * @param {import('frog-protocol').Client} client - The client to check the version for.
	 */
	handleVersionMismatch(client) {
		const serverProtocol = VersionToProtocol.getProtocol(config.serverInfo.version);

		if (!config.dev.multiProtocol) {
			if (config.dev.useLegacyVersionMismatchKickMessage) {
				if (client.version !== serverProtocol) {
					const kickMessage = Language.getKey("kickMessages.versionMismatch").replace("%s%", config.serverInfo.version);
					client.kick(kickMessage);
					return;
				}
			} else {
				if (client.version > serverProtocol) {
					client.sendPlayStatus(PlayStatus.FAILED_SERVER, true);
					return;
				} else if (client.version < serverProtocol) {
					client.sendPlayStatus(PlayStatus.FAILED_CLIENT, true);
					return;
				}
			}
		}
	}

	/**
	 * Sends the response pack info to the client.
	 *
	 * @param {import('frog-protocol').Client} client - The client to send the response pack info to.
	 */
	sendResponsePackInfo(client) {
		const responsePackInfo = new ResponsePackInfo();
		responsePackInfo.must_accept = false;
		responsePackInfo.has_scripts = false;
		responsePackInfo.behavior_packs = [];
		responsePackInfo.texture_packs = [];
		responsePackInfo.writePacket(client);
	}

	/**
	 * Emits the player join event.
	 *
	 * @param {import('frog-protocol').Client} client - The client that joined the server.
	 */
	emitPlayerJoinEvent(client) {
		Frog.eventEmitter.emit("playerJoin", {
			player: client,
			server: this,
			cancel: (reason = Language.getKey("kickMessages.serverDisconnect")) => {
				client.kick(reason);
			},
		});
	}
}

module.exports = PlayerJoinHandler;
