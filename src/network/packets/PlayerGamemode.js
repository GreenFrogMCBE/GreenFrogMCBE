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

const GameMode = require("../../player/GameMode");

let gamemode = GameMode.FALLBACK;
class PlayerGamemode extends require("./Packet") {
  /**
   * It returns the packet name
   * @returns The packet name
   */
  name() {
    return "set_player_game_type";
  }

  /**
   * It sets the gamemode.
   * @param gamemode1 - The gamemode.
   */
  setGamemode(gamemode1) {
    gamemode = gamemode1;
  }

  /**
   * It returns the gamemode
   * @returns The gamemode
   */
  getGamemode() {
    return gamemode;
  }

  /**
   * It sends the packet name
   * @param client - The client that will recieve the packet.
   */
  send(client) {
    client.write(this.name(), {
      gamemode: this.getGamemode(),
    });
  }
}

module.exports = PlayerGamemode;
