
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
const PlayerInfo = require("../../player/PlayerInfo");
const log = require("../Logger");
const Logger = new log();

const lang = require("../ServerInfo").lang;
const commands = require("../ServerInfo").commands;

class CommandKick extends require("./Command") {
  name() {
    return lang.command_kick;
  }

  aliases() {
    return null;
  }

  execute(args) {
    if (!commands.console_command_kick) {
      Logger.log(lang.unknownCommand);
      return;
    }
    if (!args) {
      Logger.log(lang.commandUsageKick, "info");
      return;
    }

    let playeroffline = true;

    if (!args[1]) args[1] = lang.noPlayer;

    for (let i = 0; i < PlayerInfo.prototype.getPlayers().length; i++) {
      let client = PlayerInfo.prototype.getPlayers();
      if (client.username == args[0]) {
        client.disconnect(lang.kickedPrefix + args[1]);
        playeroffline = false;
        Logger.log(
          lang.kickedConsoleMsg
            .replace("%args[0]%", args[0])
            .replace("%args[1]%", args[1]),
          "info"
        );
      }
    }

    if (playeroffline || PlayerInfo.prototype.getargs[0] === undefined) {
      Logger.log(lang.playerOffline, "info");
    }
  }
}

module.exports = CommandKick;
