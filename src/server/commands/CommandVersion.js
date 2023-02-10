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
const Logger = require("../../server/Logger");
const { lang, commands, serverversion } = require("../../server/ServerInfo");

class CommandVersion extends require("./Command") {
  name() {
    return lang.commandVersion;
  }

  aliases() {
    return [lang.commandVer];
  }

  execute() {
    if (!commands.console_command_version) {
      Logger.log(lang.unknownCommand);
      return;
    }
    Logger.log(
      lang.commandVerInfo.replace("%version%", serverversion)
    );
  }

  getPlayerDescription() {
    return lang.ingameVerDescription;
  }

  executePlayer(client) {
    if (!commands.player_command_version) {
      client.sendMessage(lang.playerUnknownCommand);
      return;
    }

    client.sendMessage(
      lang.playerVerCommandLine1.replace("%version%", serverversion)
    );
    client.sendMessage(lang.playerVerCommandLine2);
    return;
  }
}

module.exports = CommandVersion;
