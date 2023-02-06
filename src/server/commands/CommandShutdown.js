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
const ShutdownAPI = require("../ShutdownAPI");
const { lang, commands } = require("../../server/ServerInfo")


class CommandShutdown extends require("./Command") {
  name() {
    return lang.commandStop;
  }

  aliases() {}

  execute() {
    ShutdownAPI.shutdownServer();
  }

  getPlayerDescription() {
    return lang.ingameStopDescription;
  }

  executePlayer(client) {
    if (!commands.player_command_stop) {
      client.sendMessage(lang.playerUnknownCommand);
      return;
    }
    if (!client.op) {
      client.sendMessage(lang.noPermission);
      return;
    }
    this.execute();
  }
}

module.exports = CommandShutdown;
