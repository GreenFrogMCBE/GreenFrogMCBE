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
const Chat = require("../api/Chat");
const GameMode = require("../api/GameMode");
const { lang } = require("../api/ServerInfo");
const PlayerKickEvent = require("../events/PlayerKickEvent");
const PlayerLeaveEvent = require("../events/PlayerLeaveEvent");
const PlayerTransferEvent = require("../events/PlayerTransferEvent");
const ServerToClientChatEvent = require("../events/ServerToClientChatEvent");
const PlayerGamemodeChangeEvent = require("../events/PlayerGamemodeChangeEvent");
const UpdateAttributes = require("../network/packets/ServerUpdateAttributesPacket");
const ServerSetEntityDataPacket = require("../network/packets/ServerSetEntityDataPacket");
const ChunkRadiusUpdate = require("../network/packets/ServerChunkRadiusUpdatePacket");
const PlayerUpdateDifficultyEvent = require("../events/PlayerUpdateDifficultyEvent");
const ChangeDimension = require("../network/packets/ServerChangeDimensionPacket");
const PluginChatAsPlayerEvent = require("../events/PluginChatAsPlayerEvent");
const PlayerHealthUpdateEvent = require("../events/PlayerHealthUpdateEvent");
const PlayerTimeUpdateEvent = require("../events/PlayerTimeUpdateEvent");
const PlayerList = require("../network/packets/ServerPlayerListPacket");
const PlayerListTypes = require("../network/packets/types/PlayerList");
const GarbageCollector = require("../utils/GarbageCollector");
const PlayerInfo = require("../api/PlayerInfo");

module.exports = {
	/**
	 * @param {any} player
	 * @param {any} server
	 */
	_initPlayer(player, server) {
		/**
		 * Sends a message to the player
		 * @param {String} message - The message to send
		 */
		player.sendMessage = function (message) {
			const sendMessageEvent = new ServerToClientChatEvent();
			sendMessageEvent.message = message;
			sendMessageEvent.player = player;
			sendMessageEvent.server = server;
			sendMessageEvent.execute();
		};

		/**
		 * Sends a chat message as a player
		 * @param {String} message - The message to send as a player
		 */
		player.chat = function (message) {
			const chatAsPlayerEvent = new PluginChatAsPlayerEvent();
			chatAsPlayerEvent.player = player;
			chatAsPlayerEvent.message = message;
			chatAsPlayerEvent.server = server.server;
			chatAsPlayerEvent.execute();
		};

		/**
		 * Sets a player gamemode
		 * @param {Gamemode} gamemode - The gamemode. This can be survival, creative, adventure, spectator or fallback
		 */
		player.setGamemode = function (gamemode) {
			const allowedGameModes = [GameMode.SURVIVAL, GameMode.CREATIVE, GameMode.ADVENTURE, GameMode.SPECTATOR, GameMode.FALLBACK];

			if (!allowedGameModes.includes(gamemode)) {
				throw new Error("Invalid game mode!");
			}

			const gamemodeChangeEvent = new PlayerGamemodeChangeEvent();
			gamemodeChangeEvent.player = player;
			gamemodeChangeEvent.server = server.server;
			gamemodeChangeEvent.gamemode = gamemode;
			gamemodeChangeEvent.oldGamemode = player.gamemode;
			gamemodeChangeEvent.execute();
		};

		/**
		 * Transfers the player to a different server
		 * @param {String} address - The address of the server to transfer to
		 * @param {Number} port - The port of the server to transfer to
		 */
		player.transfer = function (address, port) {
			const transferEvent = new PlayerTransferEvent();
			transferEvent.address = address;
			transferEvent.port = port;
			transferEvent.player = player;
			transferEvent.server = server;
			transferEvent.execute();
		};

		/**
		 * Sets the player local difficulty
		 * @param {Difficulty} difficulty
		 */
		player.setDifficulty = function (difficulty) {
			const difficultyEvent = new PlayerUpdateDifficultyEvent();
			difficultyEvent.server = server;
			difficultyEvent.player = player;
			difficultyEvent.difficulty = difficulty;
			difficultyEvent.execute();
		};

		/**
		 * Sets the data of the player/entity (eg on_fire, etc)
		 * @param {String} field
		 * @param {Boolean} value
		 */
		player.setEntityData = function (field, value) {
			const playerEntityPacket = new ServerSetEntityDataPacket();
			playerEntityPacket.setProperties({
				ints: [],
				floats: [],
			});
			playerEntityPacket.setRuntimeEntityID(0); // Local player
			playerEntityPacket.setTick(0);
			playerEntityPacket.setValue(field, value);
			playerEntityPacket.writePacket(player);
		};

		/**
		 * Kicks a player from the server
		 * @param {String} [msg=lang.kickmessages.kickedByPlugin] - The reason for the kick
		 */
		player.kick = function (msg = lang.kickmessages.kickedByPlugin) {
			if (player.kicked) return;
			player.kicked = true;

			const kickEvent = new PlayerKickEvent();
			kickEvent.server = server;
			kickEvent.player = player;
			kickEvent.message = msg;
			kickEvent.execute();

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
		 * @param {Number} radius
		 */
		player.setChunkRadius = function (radius) {
			const chunkradiusupdate = new ChunkRadiusUpdate();
			chunkradiusupdate.setChunkRadius(radius);
			chunkradiusupdate.writePacket(player);
		};

		/**
		 * Sets the player's time
		 * @param {Number} time - The time to set the player to
		 */
		player.setTime = function (time) {
			const timeevent = new PlayerTimeUpdateEvent();
			timeevent.player = player;
			timeevent.server = server;
			timeevent.time = time;
			timeevent.execute();
		};

		/**
		 * Sets some attribute for the player
		 * @param {JSON} attribute
		 */
		player.setAttribute = function (attribute) {
			const updateattributespacket = new UpdateAttributes();
			updateattributespacket.setPlayerID(0); // 0 - Means local player
			updateattributespacket.setTick(0);
			updateattributespacket.setAttributes([attribute]);
			updateattributespacket.writePacket(player);
		};

		/**
		 * Sets the XP for the player
		 * @param {Float} xp
		 */
		player.setXP = function (xp) {
			player.setAttribute({
				"min": 0,
				"max": 1000000,
				"current": xp,
				"default": 0,
				"name": "player.experience",
				"modifiers": []
			})
		}

		/**
		 * Sets the health of the player
		 * @param {Float} health
		 * @param {DamageCause} cause
		 */
		player.setHealth = function (health, cause) {
			if (player.dead) return;

			const healthUpdateEvent = new PlayerHealthUpdateEvent();
			healthUpdateEvent.server = server.server;
			healthUpdateEvent.player = player;
			healthUpdateEvent.modifiers = [];
			healthUpdateEvent.minHealth = 0;
			healthUpdateEvent.maxHealth = 20;
			healthUpdateEvent.health = health;
			healthUpdateEvent.attributeName = "minecraft:health"
			healthUpdateEvent.cause = cause
			healthUpdateEvent.execute();
		};

		/**
		 * Updates the dimension for the player
		 * @param {Float} x
		 * @param {Float} y
		 * @param {Float} z
		 * @param {Dimensions} dimension
		 * @param {Boolean} respawn
		 */
		player.setDimension = function (x, y, z, dimension, respawn) {
			const dimensionpacket = new ChangeDimension();
			dimensionpacket.setPosition(x, y, z);
			dimensionpacket.setDimension(dimension);
			dimensionpacket.setRespawn(respawn);
			dimensionpacket.writePacket(player);
		};

		player.on("close", () => {
			for (let i = 0; i < PlayerInfo.players.length; i++) {
				if (PlayerInfo.players[i].username !== player.username) {
					const pl = new PlayerList();
					pl.setType(PlayerListTypes.REMOVE);
					pl.setUuid(player.profile.uuid);
					pl.writePacket(PlayerInfo.players[i]);
				}
			}

			const leaveEvent = new PlayerLeaveEvent();
			leaveEvent.player = player;
			leaveEvent.server = server;
			leaveEvent.execute();

			GarbageCollector.clearOfflinePlayers();

			Logger.info(lang.playerstatuses.disconnected.replace("%player%", player.username));

			if (player.initialised) {
				Chat.broadcastMessage(lang.broadcasts.leftTheGame.replace("%player%", player.username));
			}

			player.offline = true;
		});
	},
};
