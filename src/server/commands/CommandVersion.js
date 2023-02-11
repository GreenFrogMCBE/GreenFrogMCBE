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
const { lang, config, serverversion } = require("../../server/ServerInfo");

class CommandVersion extends require("./Command") {
  name() {
    return lang.commands.Version;
  }

  aliases() {
    return [lang.commands.Ver];
  }

  execute() {
    if (!config.consoleCommandVersion) {
      Logger.log(lang.errors.unknownCommand);
      return;
    }

    Logger.log(lang.commands.verInfo.replace("%version%", serverversion));
  }

  getPlayerDescription() {
    return lang.commands.ingameVerDescription;
  }

  executePlayer(client) {
    if (!config.playerCommandVersion) {
      client.sendMessage(lang.errors.playerUnknownCommand);
      return;
    }

    client.sendMessage(
      lang.commands.playerVerCommandLine1.replace("%version%", serverversion)
    );
    client.sendMessage(lang.commands.playerVerCommandLine2);
    return;
  }
}

module.exports = CommandVersion;
