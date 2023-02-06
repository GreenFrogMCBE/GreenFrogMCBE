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
/* eslint-disable no-unused-vars */
class Command {
  constructor() {}

  /**
   * It's a function named `name` returns the command name
   */
  name() {}

  /**
   * `aliases()` is a function that returns an array of aliases
   */
  aliases() {}

  /**
   * It executes the command code
   * @param args - The arguments that the user has typed in.
   * @param server - The server object.
   */
  execute() {}

  /**
   * It returns the command description for player.
   */
  getPlayerDescription() {}

  /**
   * It executes the command code as a player
   * @param client - The client that is executing the command.
   * @param args - The arguments that the user has typed in.
   */
  executePlayer() {}
}

module.exports = Command;