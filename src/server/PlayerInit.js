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
const Logger = require("./Logger");

const GameMode = require("../api/player/GameMode");

const InvalidGamemodeException = require("../utils/exceptions/InvalidGamemodeException");

const ServerTextPacket = require("../network/packets/ServerTextPacket");
const ServerChangeDimensionPacket = require("../network/packets/ServerChangeDimensionPacket");
const ServerUpdateAttributesPacket = require("../network/packets/ServerUpdateAttributesPacket");
const ServerTransferPacket = require("../network/packets/ServerTransferPacket");
const ServerSetDifficultyPacket = require("../network/packets/ServerSetDifficultyPacket");
const ServerSetPlayerGameTypePacket = require("../network/packets/ServerSetPlayerGameTypePacket");
const ServerSetEntityDataPacket = require("../network/packets/ServerSetEntityDataPacket");
const ServerChunkRadiusUpdatePacket = require("../network/packets/ServerChunkRadiusUpdatePacket");
const ServerUpdateTimePacket = require("../network/packets/ServerUpdateTimePacket");

const PlayerList = require("../network/packets/ServerPlayerListPacket");
const PlayerListTypes = require("../network/packets/types/PlayerList");

const GarbageCollector = require("../utils/GarbageCollector");

const DamageCause = require("../api/health/DamageCause");
const HungerCause = require("../api/health/HungerCause");

const PlayerInfo = require("../api/PlayerInfo");

const Frog = require("../Frog");

/** @private */
let lang = Frog.serverConfigurationFiles.lang;

module.exports = {
	/**
	 * @async
	 * 
	 * @param {Client} player
	 * @param {Server} server
	 */
	async initPlayer(player, server) {
		/**
		 * Sends a message to the player
		 * 
		 * @param {String} message - The message to send
		 */
		player.sendMessage = function (message) {
			let shouldSendMessage = true

			Frog.eventEmitter.emit('serverToClientMessage', {
				player,
				server,
				message,
				cancel() {
					shouldSendMessage = true;
				},
			});

			if (!shouldSendMessage) return

			const text = new ServerTextPacket();
			text.setMessage(message);
			text.writePacket(player);
		};

		/**
		 * Sends a chat message as a player
		 * 
		 * @param {String} message - The message to send as a player
		 */
		player.chat = function (message) {
			let shouldSendMessage = true;

			Frog.eventEmitter.emit('serverChatAsPlayer', {
				player,
				server,
				message,
				cancel() {
					shouldSendMessage = false
				},
			});

			if (!shouldSendMessage) return;

			Frog.broadcastMessage(lang.chat.chatFormat.replace("%username%", this.player.username).replace("%message%", this.message));
		};

		/**
		 * Sets a player gamemode
		 * 
		 * @param {Gamemode} gamemode - The gamemode. This can be survival, creative, adventure, spectator or fallback
		 * @type {import('../api/GameMode')}
		 */
		// prettier-ignore
		player.setGamemode = function (gamemode) {
			const allowedGameModes = [
				GameMode.SURVIVAL,
				GameMode.CREATIVE,
				GameMode.ADVENTURE,
				GameMode.SPECTATOR,
				GameMode.FALLBACK
			];

			if (!allowedGameModes.includes(gamemode)) {
				throw new InvalidGamemodeException()
			}

			let shouldChangeGamemode = true;

			Frog.eventEmitter.emit('serverGamemodeChange', {
				player,
				server,
				gamemode,
				oldGamemode: player.gamemode,
				cancel() {
					shouldChangeGamemode = false
				},
			});

			if (!shouldChangeGamemode) return;

			const playerGamemode = new ServerSetPlayerGameTypePacket();
			playerGamemode.setGamemode(gamemode);
			playerGamemode.writePacket(this.player);

			return true;
		};

		/**
		 * Transfers the player to a different server
		 * 
		 * @param {String} address - The address of the server to transfer to
		 * @param {Number} port - The port of the server to transfer to
		 */
		player.transfer = function (address, port) {
			let shouldTransfer = true;

			Frog.eventEmitter.emit('playerTransferEvent', {
				player,
				port,
				address,
				server: Frog.server,
				cancel() {
					shouldTransfer = false
				},
			});

			if (!shouldTransfer) return;

			const transferPacket = new ServerTransferPacket();
			transferPacket.setServerAddress(address);
			transferPacket.setPort(port);
			transferPacket.writePacket(player);

			return true;
		};

		/**
		 * Sets the player local difficulty
		 * 
		 * @param {Difficulty} difficulty
		 * @type {import('../type/Difficulty')}
		 */
		player.setDifficulty = function (difficulty) {
			let shouldChangeDifficulty = true;

			Frog.eventEmitter.emit('serverSetDifficulty', {
				player,
				difficulty,
				server: Frog.server,
				cancel() {
					shouldChangeDifficulty = false;

					return true;
				},
			});

			if (shouldChangeDifficulty) {
				const difficultypacket = new ServerSetDifficultyPacket();
				difficultypacket.setDifficulty(difficulty);
				difficultypacket.writePacket(player);
			}
		};

		/**
		 * Sets the data of the player/entity (eg on_fire, etc)
		 * @param {String} field
		 * @param {Boolean} value
		 */
		player.setEntityData = function (field, value) {
			let shouldSetED = true;

			Frog.eventEmitter.emit('serverSetEntityData', {
				player,
				field,
				value,
				server: Frog.server,
				cancel() {
					shouldSetED = false;

					return true;
				},
			});

			if (shouldSetED) {
				const playerSetEntityDataPacket = new ServerSetEntityDataPacket();
				playerSetEntityDataPacket.setProperties({
					ints: [],
					floats: [],
				});
				playerSetEntityDataPacket.setRuntimeEntityID(0); // Local player
				playerSetEntityDataPacket.setTick(0);
				playerSetEntityDataPacket.setValue(field, value);
				playerSetEntityDataPacket.writePacket(player);
			}
		};

		/**
		 * Disconnect a player from the server
		 * 
		 * @param {String} [msg=lang.kickmessages.kickedByPlugin]
		 */
		player.kick = function (msg = lang.kickmessages.kickedByPlugin) {
			if (player.kicked) return;
			player.kicked = true;

			Frog.eventEmitter.emit('playerKickEvent', {
				player,
				message: msg,
				server: Frog.server,
				cancel() {
					return false
				},
			});

			if (msg === "disconnectionScreen.serverFull") {
				msg = "Wow this server is popular! Check back later to see if space opens up.";
			} else if (msg === "disconnectionScreen.noReason") {
				msg = "You were disconnected";
			}

			Logger.info(lang.kickmessages.kickedConsoleMsg.replace("%player%", player.username).replace("%reason%", msg));
			player.disconnect(msg);
		};

		/**
		 * Updates the client chunk render radius
		 * 
		 * @param {Number} radius
		 */
		player.setChunkRadius = function (radius) {
			let shouldUpdateRadius = false

			Frog.eventEmitter.emit('serverUpdateChunkRadius', {
				player,
				radius,
				server: Frog.server,
				cancel() {
					shouldUpdateRadius = true

					return true
				},
			});

			if (shouldUpdateRadius) {
				const chunkRadiusUpdate = new ServerChunkRadiusUpdatePacket();
				chunkRadiusUpdate.setChunkRadius(radius);
				chunkRadiusUpdate.writePacket(player);
			}
		}

		/**
		 * Sets the client side time
		 * 
		 * @param {Number} time - The time to set the player to
		 */
		player.setTime = function (time = 0) {
			let shouldUpdateTime = false;

			Frog.eventEmitter.emit('serverTimeUpdate', {
				player,
				time,
				server: Frog.server,
				cancel() {
					shouldUpdateTime = true

					return true
				},
			});

			if (shouldUpdateTime) {
				const timePacket = new ServerUpdateTimePacket();
				timePacket.setTime(time);
				timePacket.writePacket(player);
			}
		};

		/**
		 * Sets some attribute for the player
		 * 
		 * @param {JSON} attribute
		 */
		player.setAttribute = function (attribute) {
			let shouldSetAttribute = false;

			Frog.eventEmitter.emit('playerSetAttribute', {
				player,
				attribute,
				server: Frog.server,
				cancel() {
					shouldSetAttribute = true

					return true
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
		 * @param {Float} xp
		 */
		player.setXP = function (xp) {
			player.setAttribute({
				min: 0,
				max: 1000000,
				current: xp,
				default: 0,
				name: "player.experience",
				modifiers: [],
			});
		};

		/**
		 * Sets the health of the player
		 * 
		 * @param {Float} health
		 * @param {DamageCause} cause
		 */
		player.setHealth = function (health, cause = DamageCause.UNKNOWN) {
			if (player.dead) return;

			const healthUpdateEvent = new PlayerHealthUpdateEvent();
			healthUpdateEvent.server = server;
			healthUpdateEvent.player = player;
			healthUpdateEvent.modifiers = [];
			healthUpdateEvent.minHealth = 0;
			healthUpdateEvent.maxHealth = 20;
			healthUpdateEvent.health = health;
			healthUpdateEvent.attributeName = "minecraft:health";
			healthUpdateEvent.cause = cause;
			healthUpdateEvent.execute();
		};

		/**
		 * Sets the hunger of the player
		 * 
		 * @param {Float} hunger
		 * @param {HungerCause} cause
		 */
		player.setHunger = function (hunger, cause = HungerCause.UNKNOWN) {
			if (player.dead) return;

			const healthUpdateEvent = new PlayerHungerUpdateEvent();
			healthUpdateEvent.server = server;
			healthUpdateEvent.player = player;
			healthUpdateEvent.modifiers = [];
			healthUpdateEvent.minHunger = 0;
			healthUpdateEvent.maxHunger = 20;
			healthUpdateEvent.defaultHunger = 0;
			healthUpdateEvent.hunger = hunger;
			healthUpdateEvent.attributeName = "minecraft:player.hunger";
			healthUpdateEvent.cause = cause;
			healthUpdateEvent.execute();
		};

		/**
		 * Updates the dimension for the player
		 * 
		 * @param {Float} x
		 * @param {Float} y
		 * @param {Float} z
		 * @param {Dimensions} dimension
		 * @param {Boolean} respawn
		 */
		player.setDimension = function (x, y, z, dimension, respawn) {
			const dimensionpacket = new ServerChangeDimensionPacket();
			dimensionpacket.setPosition(x, y, z);
			dimensionpacket.setDimension(dimension);
			dimensionpacket.setRespawn(respawn);
			dimensionpacket.writePacket(player);
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
				pl.setUuid(player.profile.uuid);
				pl.writePacket(currentPlayer);
			}

			const leaveEvent = new PlayerLeaveEvent();
			leaveEvent.player = player;
			leaveEvent.server = server;
			leaveEvent.execute();

			GarbageCollector.clearOfflinePlayers();

			Logger.info(lang.playerstatuses.disconnected.replace("%player%", player.username));

			if (player.initialised) {
				Frog.broadcastMessage(lang.broadcasts.leftTheGame.replace("%player%", player.username));
			}

			player.offline = true;
		});
	},
};
