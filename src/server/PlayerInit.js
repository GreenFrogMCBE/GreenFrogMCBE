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
const Logger = require("./Logger");

const Gamemode = require("../api/player/Gamemode");

const InvalidGamemodeException = require("../utils/exceptions/InvalidGamemodeException");

const ServerTextPacket = require("../network/packets/ServerTextPacket");
const ServerChangedimensionPacket = require("../network/packets/ServerChangeDimensionPacket");
const ServerUpdateAttributesPacket = require("../network/packets/ServerUpdateAttributesPacket");
const ServerTransferPacket = require("../network/packets/ServerTransferPacket");
const ServerSetDifficultyPacket = require("../network/packets/ServerSetDifficultyPacket");
const ServerSetPlayerGameTypePacket = require("../network/packets/ServerSetPlayerGameTypePacket");
const ServerSetEntityDataPacket = require("../network/packets/ServerSetEntityDataPacket");
const ServerChunkRadiusUpdatePacket = require("../network/packets/ServerChunkRadiusUpdatePacket");
const ServerSetTimePacket = require("../network/packets/ServerSetTimePacket");
const ServerSetHealthPacket = require("../network/packets/ServerSetHealthPacket");
const ServerSetEntityMotion = require("../network/packets/ServerSetEntityMotion");
const ServerPlayStatusPacket = require("../network/packets/ServerPlayStatusPacket");
const ServerMoveEntityDataPacket = require("../network/packets/ServerMoveEntityDataPacket");

const PlayerList = require("../network/packets/ServerPlayerListPacket");
const PlayerListTypes = require("../network/packets/types/PlayerList");

const GarbageCollector = require("../utils/GarbageCollector");

const DamageCause = require("../api/health/DamageCause");
const HungerCause = require("../api/health/HungerCause");

const PlayerAttribute = require("../api/attribute/PlayerAttribute");

const PlayerInfo = require("../api/player/PlayerInfo");

const Frog = require("../Frog");

const { getKey } = require("../utils/Language");

/** @private */
let lang = Frog.serverConfigurationFiles.lang;

module.exports = {
	/**
	 * Adds API functions to the client object
	 *
	 * @param {Client} player
	 * @param {Server} server
	 */
	async initPlayer(player, server) {
		/**
		 * Sends a message to the player
		 * @param {string} message - The message to send
		 */
		player.sendMessage = function (message) {
			let shouldSendMessage = true;

			Frog.eventEmitter.emit("serverToClientMessage", {
				player,
				server,
				message,
				cancel: () => {
					shouldSendMessage = false;
				},
			});

			if (!shouldSendMessage) return;

			const serverText = new ServerTextPacket();
			serverText.setMessage(message);
			serverText.setPlatformChatId("");
			serverText.setSourceName("");
			serverText.setXuid("");
			serverText.writePacket(player);
		};

		/**
		 * Sends a chat message as a player
		 * @param {string} message - The message to send as a player
		 */
		player.chat = function (message) {
			let shouldSendMessage = true;

			Frog.eventEmitter.emit("serverChatAsPlayer", {
				player,
				server,
				message,
				cancel: () => {
					shouldSendMessage = false;
				},
			});

			if (!shouldSendMessage) return;

			Frog.broadcastMessage(lang.chat.chatFormat.replace("%username%", this.player.username).replace("%message%", this.message));
		};

		/**
		 * Sets player's gamemode
		 *
		 * @param {Gamemode} gamemode - The gamemode. This can be survival, creative, adventure, spectator or fallback
		 * @type {import('../api/player/Gamemode')}
		 */
		// prettier-ignore
		player.setGamemode = function (gamemode) {
			const allowedGamemodes = [
				Gamemode.SURVIVAL,
				Gamemode.CREATIVE,
				Gamemode.ADVENTURE,
				Gamemode.SPECTATOR,
				Gamemode.FALLBACK
			];

			if (!allowedGamemodes.includes(gamemode)) {
				throw new InvalidGamemodeException(gamemode)
			}

			let shouldChangeGamemode = true;

			Frog.eventEmitter.emit('serverGamemodeChange', {
				player,
				server,
				gamemode,
				oldGamemode: player.gamemode,
				cancel: () => {
					shouldChangeGamemode = false
				},
			});

			if (!shouldChangeGamemode) return;

			player.gamemode = gamemode

			const playerGamemode = new ServerSetPlayerGameTypePacket();
			playerGamemode.setGamemode(gamemode);
			playerGamemode.writePacket(player);
		};

		/**
		 * Sets player's velocity
		 * NOTE: This is handled by the client, and not server-side
		 *
		 * @param {float} x
		 * @param {float} y
		 * @param {float} z
		 */
		player.setVelocity = function (x, y, z) {
			let shouldSetVelocity = true;

			Frog.eventEmitter.emit("serverVelocityUpdate", {
				player,
				server: require("../Server"),
				coordinates: {
					x,
					y,
					z,
				},
				cancel: () => {
					shouldSetVelocity = false;
				},
			});

			if (!shouldSetVelocity) return;

			const setEntityMotionPacket = new ServerSetEntityMotion();
			setEntityMotionPacket.setRuntimeEntityID(0);
			setEntityMotionPacket.setVelocity({ x, y, z });
			setEntityMotionPacket.writePacket(player);
		};

		/**
		 * Teleports player
		 *
		 * @param {float} x
		 * @param {float} y
		 * @param {float} z
		 * @param {float} rot_x
		 * @param {float} rot_y
		 * @param {float} rot_z
		 */
		player.teleport = function (x, y, z, rot_x = undefined, rot_y = undefined, rot_z = undefined) {
			let shouldTeleport = true;

			Frog.eventEmitter.emit("playerTeleport", {
				x,
				y,
				z,
				has_rot_x: rot_x !== undefined,
				has_rot_y: rot_y !== undefined,
				has_rot_z: rot_z !== undefined,
				player,
				server: require("../Server"),
				cancel: () => {
					shouldTeleport = false;
				},
			});

			if (!shouldTeleport) return;

			const movePacket = new ServerMoveEntityDataPacket();
			movePacket.setFlags({
				has_x: true,
				has_y: true,
				has_z: true,
				has_rot_x: false,
				has_rot_y: false,
				has_rot_z: false,
				on_ground: false,
				teleport: false,
				force_move: true,
			});
			movePacket.setRuntimeEntityId(0);
			movePacket.setX(x);
			movePacket.setY(y);
			movePacket.setZ(z);
			movePacket.setRotX(rot_x);
			movePacket.setRotY(rot_y);
			movePacket.setRotZ(rot_z);
			movePacket.writePacket(player);
		};

		/**
		 * Sends play status to the player
		 *
		 * @param {PlayStatus} play_status
		 * @param {boolean} terminate_connection
		 */
		player.sendPlayStatus = function (play_status, terminate_connection = false) {
			let sendPlayStatus = true;

			Frog.eventEmitter.emit("playerPlayStatus", {
				player,
				play_status,
				terminate_connection,
				server: server,
				cancel: () => {
					sendPlayStatus = false;
				},
			});

			if (!sendPlayStatus) return;

			const playStatus = new ServerPlayStatusPacket();
			playStatus.setStatus(play_status);
			playStatus.writePacket(player);

			if (terminate_connection) {
				player.offline = true;

				Logger.info(getKey("kickMessages.playStatus.console").replace("%s%", player.username));

				setTimeout(() => {
					// Client should disconnect itself, this is added just to prevent hacked clients from bypassing kicks
					if (player.offline) return;

					player.kick(getKey("kickMessages.playStatus").replace("%s%", play_status));
				}, 5000);
			}
		};

		/**
		 * Transfers the player to a different server
		 *
		 * @param {string} address - The address of the server to transfer to
		 * @param {number} port - The port of the server to transfer to
		 */
		player.transfer = function (address, port) {
			let shouldTransfer = true;

			Frog.eventEmitter.emit("playerTransferEvent", {
				player,
				port,
				address,
				server: server,
				cancel: () => {
					shouldTransfer = false;
				},
			});

			if (!shouldTransfer) return;

			const transferPacket = new ServerTransferPacket();
			transferPacket.setServerAddress(address);
			transferPacket.setPort(port);
			transferPacket.writePacket(player);
		};

		/**
		 * Sets player's local difficulty
		 *
		 * @param {Difficulty} difficulty
		 */
		player.setDifficulty = function (difficulty) {
			let shouldChangeDifficulty = true;

			Frog.eventEmitter.emit("serverSetDifficulty", {
				player,
				difficulty,
				server: require("../Server"),
				cancel: () => {
					shouldChangeDifficulty = false;
				},
			});

			if (!shouldChangeDifficulty) return;

			const difficultypacket = new ServerSetDifficultyPacket();
			difficultypacket.setDifficulty(difficulty);
			difficultypacket.writePacket(player);
		};

		/**
		 * Sets the data of the player/entity (eg on_fire, etc)
		 *
		 * @param {string} field
		 * @param {boolean} value
		 */
		player.setEntityData = function (field, value) {
			let shouldSetEntityData = true;

			Frog.eventEmitter.emit("serverSetEntityData", {
				player,
				field,
				value,
				server: require("../Server"),
				cancel: () => {
					shouldSetEntityData = false;
				},
			});

			if (!shouldSetEntityData) return;

			const playerSetEntityDataPacket = new ServerSetEntityDataPacket();
			playerSetEntityDataPacket.setProperties({
				ints: [],
				floats: [],
			});
			playerSetEntityDataPacket.setRuntimeEntityID("0"); // Local player
			playerSetEntityDataPacket.setTick("0");
			playerSetEntityDataPacket.setValue(field, value);
			playerSetEntityDataPacket.writePacket(player);
		};

		/**
		 * Disconnect a player from the server
		 *
		 * @param {string} [message=lang.kickmessages.kickedByPlugin]
		 * @param {boolean} [hideDisconnectionScreen=false]
		 */
		player.kick = function (message = lang.kickmessages.kickedByPlugin, hideDisconnectionScreen = false) {
			if (player.kicked) return;

			player.kicked = true;

			Frog.eventEmitter.emit("playerKickEvent", {
				player,
				message,
				server: require("../Server"),
			});

			if (message === "disconnectionScreen.serverFull") {
				message = "Wow this server is popular! Check back later to see if space opens up.";
			} else if (message === "disconnectionScreen.noReason") {
				message = "You were disconnected";
			}

			Logger.info(getKey("player.kicked").replace("%s%", player.username).replace("%d%", message));
			player.disconnect(message, hideDisconnectionScreen);
		};

		/**
		 * Updates the client chunk render radius
		 *
		 * @param {number} radius
		 */
		player.setChunkRadius = function (radius) {
			let shouldUpdateRadius = true;

			Frog.eventEmitter.emit("serverUpdateChunkRadius", {
				player,
				radius,
				server: require("../Server"),
				cancel: () => {
					shouldUpdateRadius = false;
				},
			});

			if (!shouldUpdateRadius) return;

			const chunkRadiusUpdate = new ServerChunkRadiusUpdatePacket();
			chunkRadiusUpdate.setChunkRadius(radius);
			chunkRadiusUpdate.writePacket(player);
		};

		/**
		 * Sets the client side time
		 *
		 * @param {number} time - The time to set the player to
		 */
		player.setTime = function (time = 0) {
			let shouldUpdateTime = true;

			Frog.eventEmitter.emit("serverTimeUpdate", {
				player,
				time,
				server: require("../Server"),
				cancel: () => {
					shouldUpdateTime = false;
				},
			});

			if (!shouldUpdateTime) return;

			const timePacket = new ServerSetTimePacket();
			timePacket.setTime(time);
			timePacket.writePacket(player);
		};

		/**
		 * Sets some attribute for the player
		 *
		 * @param {JSON} attribute
		 */
		player.setAttribute = function (attribute) {
			let shouldSetAttribute = true;

			Frog.eventEmitter.emit("playerSetAttribute", {
				player,
				attribute,
				server: require("../Server"),
				cancel: () => {
					shouldSetAttribute = false;
				},
			});

			if (shouldSetAttribute) {
				const updateAttributesPacket = new ServerUpdateAttributesPacket();
				updateAttributesPacket.setPlayerID(0); // 0 - Means local player
				updateAttributesPacket.setTick(0);
				updateAttributesPacket.setAttributes([attribute]);
				updateAttributesPacket.writePacket(player);
			}
		};

		/**
		 * Sets the XP for the player
		 *
		 * @param {float} xp
		 */
		player.setXP = function (xp) {
			let shouldSetXP = true;

			Frog.eventEmitter.emit("serverSetXP", {
				player,
				xp,
				server: require("../Server"),
				cancel: () => {
					shouldSetXP = false;
				},
			});

			if (!shouldSetXP) return;

			player.setAttribute({
				min: 0,
				max: 1000000,
				current: xp,
				default: 0,
				name: PlayerAttribute.EXPERIENCE,
				modifiers: [],
			});
		};

		/**
		 * Sets the health of the player
		 *
		 * @param {float} health
		 * @param {DamageCause} cause
		 */
		player.setHealth = function (health, cause = DamageCause.UNKNOWN) {
			if (player.dead) return;

			let shouldSetHealth = true;

			Frog.eventEmitter.emit("serverSetHealth", {
				player,
				health,
				cause,
				server: require("../Server"),
				cancel: () => {
					shouldSetHealth = false;
				},
			});

			if (!shouldSetHealth) return;

			const setHealthPacket = new ServerSetHealthPacket();
			setHealthPacket.setHealth(health);
			setHealthPacket.writePacket(player);

			if (this.cause == DamageCause.FALL) {
				Frog.eventEmitter.emit("playerFallDamageEvent", {
					player,
					health,
					cause,
					server: require("../Server"),
				});
			}

			if (this.cause == DamageCause.REGENERATION) {
				Frog.eventEmitter.emit("playerRegenerationEvent", {
					player,
					health,
					cause,
					server: require("../Server"),
				});
			}

			player.setAttribute({
				name: PlayerAttribute.HEALTH,
				min: 0,
				max: 20,
				current: health,
				default: 0,
				modifiers: [],
			});

			player.health = health;

			if (player.health <= 0) {
				Frog.eventEmitter.emit("playerDeathEvent", {
					player,
					server: require("../Server"),
				});

				player.dead = true;
			}
		};

		/**
		 * Sets the hunger of the player
		 *
		 * @param {float} hunger
		 * @param {HungerCause} cause
		 */
		player.setHunger = function (hunger, cause = HungerCause.UNKNOWN) {
			let shouldUpdateHunger = true;

			Frog.eventEmitter.emit("playerHungerUpdate", {
				player,
				server: require("../Server"),
				hunger,
				cause,
				cancel: () => {
					shouldUpdateHunger = false;
				},
			});

			if (!shouldUpdateHunger) return;

			player.setAttribute({
				name: PlayerAttribute.HUNGER,
				min: 0,
				max: 20,
				current: hunger,
				default: 0,
				modifiers: [],
			});

			player.hunger = hunger;
		};

		/**
		 * Updates the dimension for the player
		 *
		 * @param {float} x
		 * @param {float} y
		 * @param {float} z
		 * @param {Dimension} dimension
		 * @param {boolean} respawn
		 *
		 * @type {import('../network/packets/types/Dimension')}
		 */
		player.setDimension = function (x, y, z, dimension, respawn) {
			let shouldChangeDimension = true;

			Frog.eventEmitter.emit("serverSetDimension", {
				player,
				dimension,
				coordinates: { x, y, z },
				respawnAfterSwitch: respawn,
				server: require("../Server"),
				cancel: () => {
					shouldChangeDimension = false;
				},
			});

			if (!shouldChangeDimension) return;

			const dimensionPacket = new ServerChangedimensionPacket();
			dimensionPacket.setPosition(x, y, z);
			dimensionPacket.setDimension(dimension);
			dimensionPacket.setRespawn(respawn);
			dimensionPacket.writePacket(player);
		};

		/**
		 * Listens for player disconnects
		 */
		player.on("close", () => {
			for (let i = 0; i < PlayerInfo.players.length; i++) {
				const currentPlayer = PlayerInfo.players[i];

				if (currentPlayer.username === player.username) {
					continue;
				}

				const pl = new PlayerList();
				pl.setType(PlayerListTypes.REMOVE);
				pl.setUUID(player.profile.uuid);
				pl.writePacket(currentPlayer);
			}

			player.offline = true;

			Frog.eventEmitter.emit("playerLeave", {
				player,
				server: require("../Server"),
			});

			GarbageCollector.clearOfflinePlayers();

			Logger.info(getKey("status.resourcePacks.disconnected").replace("%s%", player.username));

			if (player.initialised) {
				Frog.broadcastMessage(getKey("chat.broadcasts.left").replace("%s%", player.username));
			}

			player.offline = true;
		});
	},
};
