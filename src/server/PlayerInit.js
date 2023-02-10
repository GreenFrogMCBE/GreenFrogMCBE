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
/* Makes the API work for the player */
const Logger = require("../server/Logger");
const Events = require("../plugin/Events");
const Text = require("../network/packets/Text");
const Chat = require("../player/Chat");
const Transfer = require("../network/packets/Transfer");
const PlayerGamemode = require("../network/packets/PlayerGamemode");
const Time = require("../network/packets/Time");
const GameMode = require("../player/GameMode");

const { lang } = require("../server/ServerInfo");

module.exports = {
  initPlayer(player) {
    /**
     * Sends a message to the player
     * @param {string} msg - The message to send
     */
    player.sendMessage = function (msg) {
      const text = new Text();
      text.setMessage(msg);
      text.send(player);
      Events.executeSRVTOCLCH(player, require("../Server"), msg);
    };

    /**
     * Sends a chat message as another player
     * @param {string} msg - The message to send
     */
    player.chat = function (msg) {
      Chat.broadcastMessage(
        lang.chatFormat
          .replace("%username%", player.username)
          .replace("%message%", msg)
      );
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
        GameMode.SEPCTATOR,
        GameMode.FALLBACK,
      ];
      if (!validGamemodes.includes(gamemode)) throw new Error(lang.errors.invalidGamemode);
      player.gamemode = gamemode;
      const gm = new PlayerGamemode();
      gm.setGamemode(gamemode);
      gm.send(player);
      Events.executeGMC(player, require("../Server.js").server, gamemode);
    };

    /**
     * Transfers the player to a different server
     * @param {string} address - The address of the server to transfer to
     * @param {number} port - The port of the server to transfer to
     */
    player.transfer = function (address, port) {
      const trpk = new Transfer();
      trpk.setServerAddress(address);
      trpk.setPort(port);
      trpk.send(player);
      Events.executeTR(player, require("../Server.js").server, address, port);
    };

    /**
     * Kicks a player from the server
     * @param {string} [msg=lang.kickedByPlugin] - The reason for the kick
     */
    player.kick = function (msg = lang.kickedByPlugin) {
      if (player.kicked) return;
      player.kicked = true;
      Events.executeFTEOK(require("../Server").server, player);
      Logger.log(
        lang.kickedConsoleMsg
          .replace("%player%", player.getUserData().displayName)
          .replace("%reason%", msg)
      );
      player.disconnect(msg);
    };

    /**
     * Sets the player's time
     * @param {number} time - The time to set the player to
     */
    player.setTime = function (time) {
      const time1 = new Time();
      time1.setTime(time);
      time1.send(player, time);
    };

    /* Checks if the player is still online */
    setInterval(() => {
      if (player.q2) {
        Events.executeOL(require("../Server").server, player);
        if (!player.kicked) {
          player.kick(lang.playerDisconnected);
          Logger.log(lang.disconnected.replace("%player%", player.username));
          Chat.broadcastMessage(
            lang.leftTheGame.replace("%player%", player.username)
          );
          delete player.q2;
          player.offline = true;
          player.q = true;
        }
      }
    }, 50);
  },
};
