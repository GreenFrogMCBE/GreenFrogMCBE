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
const log = require("../server/Logger");
const Logger = new log();
const Events = require("../server/Events");
const Text = require("../network/packets/Text");
const Chat = require("../player/Chat");
const Transfer = require("../network/packets/Transfer");
const PlayerGamemode = require("../network/packets/PlayerGamemode");
const Time = require("../network/packets/Time");
const FormRequest = require("../network/packets/FormRequest");

const lang = require("../server/ServerInfo").lang;
const config = require("../server/ServerInfo").config;

class PlayerInit {
  constructor() {}

  initPlayer(player) {
    player.gamemode = config.gamemode;
    player.items = [];

    /**
     * Sends a message to the player
     * @param {string} msg - The message to send
     */
    player.sendMessage = function (msg) {
      new Text().writePacket(player, msg);
      new Events().executeSRVTOCLCH(player, require("../Server"), msg);
    };

    /**
     * Sends a chat message as another player
     * @param {string} msg - The message to send
     */
    player.chat = function (msg) {
      new Chat().broadcastMessage(
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
      if (
        gamemode == !"survival" ||
        gamemode == !"creative" ||
        gamemode == !"adventure" ||
        gamemode == !"spectator" ||
        gamemode == !"fallback"
      )
        throw new Error("Invalid gamemode");
      new PlayerGamemode().writePacket(player, gamemode);
      new Events().executeGMC(player, require("../Server.js"), gamemode);
    };

    /**
     * Transfers the player to a different server
     * @param {string} address - The address of the server to transfer to
     * @param {number} port - The port of the server to transfer to
     */
    player.transfer = function (address, port) {
      new Transfer().writePacket(player, address, port);
      new Events().executeTR(player, require("../Server.js"), address, port);
    };

    /**
     * Sends a form to the player.
     * @param {number} id - The form id.
     * @param {string} text - The form text.
     * @param {Object} jsonbuttons - A JSON object containing buttons.
     * @param {string} title - The form title.
     * @param {string} type - The form type (modal, custom, form).
     */
    player.sendForm = function (id, text, jsonbuttons, title, type) {
      new FormRequest().writePacket(
        player,
        id,
        text,
        JSON.stringify(jsonbuttons),
        title,
        type
      );
    };

    /**
     * Kicks a player from the server
     * @param {string} [msg=lang.playerDisconnected] - The reason for the kick
     */
    player.kick = function (msg = lang.playerDisconnected) {
      if (player.kicked) return;
      player.kicked = true;
      Events.prototype.executeFTEOK(require("../Server"), player);
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
      new Time().writePacket(player, time);
    };

    /* Checks if the player is still online */
    setInterval(() => {
      if (player.q2) {
        new Events().executeOL(require("../Server").prototype.server, player);
        if (!player.kicked) {
          player.kick(lang.playerDisconnected);
          Logger.log(lang.disconnected.replace("%player%", player.username));
          new Chat().broadcastMessage(
            lang.leftTheGame.replace("%player%", player.username)
          );
          delete player.q2;
          player.offline = true;
          player.q = true;
        }
      }
    }, 50);
  }
}

module.exports = PlayerInit;
