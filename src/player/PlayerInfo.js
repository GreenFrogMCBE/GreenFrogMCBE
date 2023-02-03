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
/* It's a class that stores an array of players */
let playersonline = [];

class PlayerInfo {
  constructor() {}

  /**
   * AddPlayer(players) {
   *         this.players = players
   *     }
   * @param player - An array of player objects.
   */
  addPlayer(player) {
    playersonline.push(player);
  }

  /**
   * SetPlayers(players) {
   *         this.addPlayer(players)
   *     }
   *
   * The function takes in an array of players and adds them to the game.
   * @param players - An array of players to add to the game.
   * @deprecated
   */
  setPlayers(players) {
    this.addPlayer(players);
  }

  /**
   * GetPlayers() {
   *         return this.players
   * }
   *
   * The function getPlayers() returns the array of players.
   * @returns The players array.
   */
  getPlayers() {
    return playersonline;
  }
}

module.exports = PlayerInfo;
