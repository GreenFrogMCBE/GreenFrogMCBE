
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
const log = require("../Logger");
const Logger = new log();
const ServerInfo = require("../ServerInfo");

const lang = require("../ServerInfo").lang;
const commands = require("../ServerInfo").commands;

class CommandVersion extends require("./Command") {
  name() {
    return lang.commandVersion;
  }

  aliases() {
    return [lang.commandVer];
  }

  execute() {
    if (!commands.console_command_version) {
      Logger.prototype.log(lang.unknownCommand);
      return;
    }
    Logger.log(
      lang.commandVerInfo.replace("%version%", ServerInfo.serverversion)
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
      lang.playerVerCommandLine1.replace("%version%", ServerInfo.serverversion)
    );
    client.sendMessage(lang.playerVerCommandLine2);
    return;
  }
}

module.exports = CommandVersion;
