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
const Chat = require("../player/Chat");
const { lang } = require("./ServerInfo");
const GameMode = require("../player/GameMode");
const Time = require("../network/packets/Time");
const PlayerGamemode = require("../network/packets/PlayerGamemode");
const PlayerKickEvent = require("../plugin/events/PlayerKickEvent");
const PlayerLeaveEvent = require("../plugin/events/PlayerLeaveEvent");
const ServerToClientChat = require("../plugin/events/ServerToClientChat");
const PlayerTransferEvent = require("../plugin/events/PlayerTransferEvent");
const PlayerGamemodeChangeEvent = require("../plugin/events/PlayerGamemodeChangeEvent");
const ChangeDimension = require("../network/packets/ChangeDimension");
const PlayerListTypes = require("../network/packets/types/PlayerList");
const PlayerList = require("../network/packets/PlayerList");
const GarbageCollector = require("./GarbageCollector");
const PlayerInfo = require("../player/PlayerInfo");
const ServerInfo = require("./ServerInfo")

module.exports = {
	_initPlayer(player) {
		/**
		 * Sends a message to the player
		 * @param {string} msg - The message to send
		 */
		player.sendMessage = function (msg) {
			const sendmsgevent = new ServerToClientChat();
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
			const validGamemodes = [GameMode.SURVIVAL, GameMode.CREATIVE, GameMode.ADVENTURE, GameMode.SPECTATOR, GameMode.FALLBACK];
			if (!validGamemodes.includes(gamemode)) throw new Error(lang.errors.invalidGamemode);

			player.gamemode = gamemode;
			const gm = new PlayerGamemode();
			gm.setGamemode(gamemode);
			gm.send(player);
			new PlayerGamemodeChangeEvent().execute(require("../Server").server, player, gamemode);
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

			Logger.log(lang.kickmessages.kickedConsoleMsg.replace("%player%", player.getUserData().displayName).replace("%reason%", msg));
			player.disconnect(msg);
		};

		/**
		 * Sets the player's time
		 * @param {Number} time - The time to set the player to
		 */
		player.setTime = function (time) {
			const timepacket = new Time();
			timepacket.setTime(time);
			timepacket.send(player, time);
		};

		/**
		 * Sets the dimension for the player
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
			dimensionpacket.send(player);
		};

		player.on("close", () => {
			if (!player.kicked) {
				for (let i = 0; i < PlayerInfo.players.length; i++) {
					if (PlayerInfo.players[i].username !== player.username) {
						ServerInfo.addPlayer();
						const pl = new PlayerList();
						pl.setType(PlayerListTypes.REMOVE);
						pl.setUuid(player.profile.uuid);
						pl.send(PlayerInfo.players[i]);
					}
				}
				
				GarbageCollector.clearOfflinePlayers()

				new PlayerLeaveEvent().execute(require("../Server").server, player);

				Logger.log(lang.playerstatuses.disconnected.replace("%player%", player.username));
				Chat.broadcastMessage(lang.broadcasts.leftTheGame.replace("%player%", player.username));
				player.offline = true;
			}
		});
	},
};
