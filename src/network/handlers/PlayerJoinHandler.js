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
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Frog = require("../../Frog");

const PlayerInfo = require("../../player/PlayerInfo");
const PlayerInit = require("../../player/PlayerInit");

const Language = require("../../utils/Language");

const ResourcePackInfo = require("../packets/ServerResourcePackInfoPacket");
const PlayStatus = require("../../network/packets/types/PlayStatus");

const VersionToProtocol = require("../../utils/VersionToProtocol");
const UsernameValidator = require("../../player/UsernameValidator");

const PacketHandler = require("./PacketHandler");

const config = Frog.config;

class PlayerJoinHandler {
	/**
	 * Executes when a player joins the server.
	 *
	 * @param {import("Frog").Player} player - The player joining the server.
	 */
	async onPlayerJoin(player) {
		await this.initPlayer(player);

		this.setupPlayerProperties(player);
		this.setupPlayerIntervals(player);
		this.validateUsername(player);
		this.addPlayer(player);
		this.handleMaxPlayers(player);
		this.handleVersionMismatch(player);
		this.sendResponsePackInfo(player);
		this.emitPlayerJoinEvent(player);
		this.setupEvents(player);
	}

	/**
	 * Validates the username of the player
	 *
	 * @param {import("Frog").Player} player
	 */
	validateUsername(player) {
		if (!UsernameValidator.isUsernameValid(player.username) && config.dev.validateUsernames) {
			player.kick(Language.getKey("kickMessages.invalidUsername"));
			return;
		}
	}

	/**
	 * Setups events for the player
	 *
	 * @param {import("Frog").Player} player
	 */
	async setupEvents(player) {
		Frog.eventEmitter.emit("playerPreConnect", {
			player,
			cancel: (reason = Language.getKey("kickMessages.serverDisconnect")) => {
				player.kick(reason);
			},
		});

		player._queue = player.queue;
		player.queue = (name, params) => {
			let shouldQueue = true;

			Frog.eventEmitter.emit("packetQueue", {
				player,
				packet: {
					data: {
						// Follow bedrock-protocol's packet structure
						name,
						params,
					},
				},
				cancel: () => {
					shouldQueue = false;
				},
			});

			if (shouldQueue) {
				player._queue(name, params);
			}
		};

		player.on("packet", (packet) => {
			new PacketHandler().handlePacket(player, packet);
		});
	}

	/**
	 * Initialises the player.
	 *
	 * @param {import("Frog").Player} player - The player to initialize.
	 * @returns {Promise<void>}
	 */
	async initPlayer(player) {
		await PlayerInit.initPlayer(player);
	}

	/**
	 * Sets up the player properties.
	 *
	 * @param {import("Frog").Player} player - The player to set up properties for.
	 */
	setupPlayerProperties(player) {
		Object.assign(player, {
			username: player.profile.name,
			gamemode: null,
			dead: null,
			health: 20,
			hunger: 20,
			world: null,
			renderChunks: true,
			isConsole: false,
			inventory: {
				container: {
					blockPosition: {
						x: null,
						y: null,
						z: null,
					},
					isOpen: false,
					window: {
						id: null,
						type: null,
					},
				},
				items: [],
				lastUsedItem: {
					networkId: null,
					runtimeId: null,
				},
			},
			location: {
				onGround: false,
				x: 0,
				y: -47,
				z: 0,
				yaw: 0,
				pitch: 0,
			},
			network: {
				address: player.connection.address.split("/")[0],
				port: player.connection.address.split("/")[1],
				packetCount: 0,
				offline: false,
				initialised: false,
				protocolVersion: null,
			},
			permissions: {
				op: null,
				permissionLevel: null,
			},
			_damage: {
				fall: {
					queue: null,
				},
				void: {
					invulnerable: null,
				},
			},
		});
	}

	/**
	 * Sets up player intervals.
	 *
	 * @param {import("Frog").Player} player - The player to set up intervals for.
	 */
	setupPlayerIntervals(player) {
		setInterval(() => {
			player.network.packetCount = 0;
		}, 1000);
	}

	/**
	 * Adds the player to the player list.
	 *
	 * @param {import("Frog").Player} player - The player to add to the player list.
	 */
	addPlayer(player) {
		PlayerInfo.addPlayer(player);
	}

	/**
	 * Handles the case when the maximum number of playersOnline.is reached.
	 *
	 * @param {import("Frog").Player} player - The player to check against the maximum player count.
	 */
	handleMaxPlayers(player) {
		if (PlayerInfo.playersOnline.length > config.serverInfo.maxPlayers) {
			const kickMessage = config.dev.useLegacyServerFullKickMessage ? Language.getKey("kickMessages.serverFull") : PlayStatus.FAILED_SERVER_FULL;
			player.kick(kickMessage);
			return;
		}
	}

	/**
	 * Handles the version mismatch between the player and server.
	 *
	 * @param {import("Frog").Player} player - The player to check the version for.
	 */
	handleVersionMismatch(player) {
		const serverProtocol = VersionToProtocol.getProtocol(config.serverInfo.version);

		if (config.dev.multiProtocol) {
			if (config.dev.useLegacyVersionMismatchKickMessage) {
				if (player.network.protocolVersion !== serverProtocol) {
					const kickMessage = Language.getKey("kickMessages.versionMismatch").replace("%s", config.serverInfo.version);
					player.kick(kickMessage);
					return;
				}
			} else {
				if (player.network.protocolVersion > serverProtocol) {
					player.sendPlayStatus(PlayStatus.FAILED_SERVER, true);
					return;
				} else if (player.network.protocolVersion < serverProtocol) {
					player.sendPlayStatus(PlayStatus.FAILED_CLIENT, true);
					return;
				}
			}
		}
	}

	/**
	 * Sends the response pack info to the player.
	 *
	 * @param {import("Frog").Player} player - The player to send the response pack info to.
	 */
	sendResponsePackInfo(player) {
		const responsePackInfo = new ResourcePackInfo();
		responsePackInfo.must_accept = false;
		responsePackInfo.has_scripts = false;
		responsePackInfo.behavior_packs = [];
		responsePackInfo.texture_packs = [];
		responsePackInfo.rtx_enabled = false;
		responsePackInfo.writePacket(player);
	}

	/**
	 * Emits the player join event.
	 *
	 * @param {import("Frog").Player} player - The player that joined the server.
	 */
	emitPlayerJoinEvent(player) {
		Frog.eventEmitter.emit("playerJoin", {
			player,
			cancel: (reason = Language.getKey("kickMessages.serverDisconnect")) => {
				player.kick(reason);
			},
		});
	}
}

module.exports = PlayerJoinHandler;
