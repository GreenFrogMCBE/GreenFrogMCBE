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
const Time = require("../network/packets/ServerUpdateTimePacket");
const PlayerTransferEvent = require("../events/PlayerTransferEvent");
const ServerToClientChatEvent = require("../events/ServerToClientChatEvent");
const PlayerGamemodeChangeEvent = require("../events/PlayerGamemodeChangeEvent");
const PlayerGamemode = require("../network/packets/ServerSetPlayerGameTypePacket");
const UpdateAttributes = require("../network/packets/ServerUpdateAttributesPacket");
const ChunkRadiusUpdate = require("../network/packets/ServerChunkRadiusUpdatePacket");
const ChangeDimension = require("../network/packets/ServerChangeDimensionPacket");
const PlayerHealthUpdateEvent = require("../events/PlayerHealthUpdateEvent");
const PlayerList = require("../network/packets/ServerPlayerListPacket");
const PlayerListTypes = require("../network/packets/types/PlayerList");
const GarbageCollector = require("../utils/GarbageCollector");
const PlayerInfo = require("../api/PlayerInfo");

module.exports = {
	/**
	 * @private
	 * @param {Object} player 
	 */
	_initPlayer(player) {
		/**
		 * Sends a message to the player
		 * @param {string} msg - The message to send
		 */
		player.sendMessage = function (msg) {
			const sendmsgevent = new ServerToClientChatEvent();
			sendmsgevent.execute(require("../Server").server, player, msg);
		};

		/**
		 * Sends a chat message as a player
		 * @param {string} msg - The message to send as a player
		 */
		player.chat = function (msg) {
			Chat.broadcastMessage(lang.chat.chatFormat.replace("%username%", player.username).replace("%message%", msg));
		};

		/**
		 * Sets a player gamemode
		 * @param {string} gamemode - The gamemode. This can be survival, creative, adventure, spectator or fallback
		 */
		player.setGamemode = function (gamemode) {
			const validGamemodes = [
				GameMode.SURVIVAL,
				GameMode.CREATIVE, 
				GameMode.ADVENTURE, 
				GameMode.SPECTATOR, 
				GameMode.FALLBACK
			];
			if (!validGamemodes.includes(gamemode)) throw new Error("Invalid gamemode!")

			player.gamemode = gamemode;

			const gm = new PlayerGamemode();
			gm.setGamemode(gamemode);
			gm.writePacket(player);
			
			const gamemodechange = new PlayerGamemodeChangeEvent()
			gamemodechange.execute(require("../Server").server, player, gamemode);
		};

		/**
		 * Transfers the player to a different server
		 * @param {string} address - The address of the server to transfer to
		 * @param {number} port - The port of the server to transfer to
		 */
		player.transfer = function (address, port) {
			const transfer = new PlayerTransferEvent();
			transfer.execute(require("../Server").server, player, address, port);
		};

		/**
		 * Kicks a player from the server
		 * @param {string} [msg=lang.kickmessages.kickedByPlugin] - The reason for the kick
		 */
		player.kick = function (msg = lang.kickmessages.kickedByPlugin) {
			if (player.kicked) return;
			player.kicked = true;

			new PlayerKickEvent().execute(require("../Server").server, player, msg);

			if (msg === "disconnectionScreen.serverFull") {
				msg = "Wow this server is popular! Check back later to see if space opens up.";
			} else if (msg === "disconnectionScreen.noReason") {
				msg = "You were disconnected";
			}

			Logger.info(lang.kickmessages.kickedConsoleMsg.replace("%player%", player.getUserData().displayName).replace("%reason%", msg));
			player.disconnect(msg);
		};

		player.setChunkRadius = function (radius) {
			const chunkradiusupdate = new ChunkRadiusUpdate();
			chunkradiusupdate.setChunkRadius(
				radius
			);
			chunkradiusupdate.writePacket(player);
		}

		/**
		 * Sets the player's time
		 * @param {Number} time - The time to set the player to
		 */
		player.setTime = function (time) {
			const timepacket = new Time();
			timepacket.setTime(time);
			timepacket.writePacket(player, time);
		};

		/**
		 * Sets some attribute for the player
		 * @param {JSON} attribute
		 */
		player.setAttribute = function (attribute) {
			const updateattributespacket = new UpdateAttributes()
			updateattributespacket.setPlayerID(0) // 0 - Means local player
			updateattributespacket.setTick(0)
			updateattributespacket.setAttributes([attribute])
			updateattributespacket.writePacket(player)
		}

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
		 */
		player.setHealth = function (health) {
			if (player.dead) return

			const playerhealthupdateevent = new PlayerHealthUpdateEvent()
			playerhealthupdateevent.execute(require("../Server").server, player, health)
		};

		/**
		 * Updates the dimension for the player
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} z
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
			if (!player.kicked) {
				for (let i = 0; i < PlayerInfo.players.length; i++) {
					if (PlayerInfo.players[i].username !== player.username) {
						const pl = new PlayerList();
						pl.setType(PlayerListTypes.REMOVE);
						pl.setUuid(player.profile.uuid);
						pl.writePacket(PlayerInfo.players[i]);
					}
				}

				GarbageCollector.clearOfflinePlayers();

				new PlayerLeaveEvent().execute(require("../Server").server, player);

				Logger.info(lang.playerstatuses.disconnected.replace("%player%", player.username));
				Chat.broadcastMessage(lang.broadcasts.leftTheGame.replace("%player%", player.username));
				player.offline = true;
			}
		});
	},
};
