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
let playersOnline = [];

module.exports = {
  /**
   * @param player - A player.
   */
  addPlayer(player) {
    playersOnline.push(player);
  },

  /**
   * @param {Object} player
   * @returns The player if the player is online, null otherwise.
   */
  get(player) {
    try {
     for (let i = 0; i < playersOnline.length; i++) {
      if (playersOnline[i].username === player) {
        console.log(playersOnline[i].username, player)
        return playersOnline[i]
      }
     }
    } catch (e) {
      return null;
    }
  },

  /**
   * @returns The players array.
   */
  players: playersOnline,
};
