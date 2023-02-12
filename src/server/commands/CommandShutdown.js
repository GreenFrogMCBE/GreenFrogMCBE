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
const { lang, config } = require("../../server/ServerInfo");

class CommandShutdown extends require("./Command") {
  name() {
    return lang.commands.Stop;
  }

  aliases() {
    return null;
  }

  execute() {
    require("../ShutdownAPI").shutdownServer();
  }

  getPlayerDescription() {
    return lang.commands.ingameStopDescription;
  }

  executePlayer(client) {
    if (!config.playerCommandStop) {
      client.sendMessage(lang.errors.playerUnknownCommand);
      return;
    }
    if (!client.op) {
      client.sendMessage(lang.errors.noPermission);
      return;
    }
    client.sendMessage("§c" + lang.server.stoppingServer);
    this.execute();
  }
}

module.exports = CommandShutdown;
