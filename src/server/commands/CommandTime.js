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
const Logger = require("../Logger");
const TimePacket = require("../../network/packets/Time");
const PlayerInfo = require("../../player/PlayerInfo");

const lang = require("../../server/ServerInfo").lang;
const commands = require("../../server/ServerInfo").commands;

class CommandTime extends require("./Command") {
  name() {
    return lang.commandTime;
  }

  aliases() {}

  execute(args) {
    if (!commands.console_command_time) {
      Logger.log(lang.unknownCommand);
      return;
    }
    if (!args) {
      Logger.log(lang.commandUsageTime, "info");
      return;
    }

    let time = args[1];
    switch (time) {
      case "day":
        time = 1000;
        break;
      case "night":
        time = 17000;
        break;
      default:
        time = parseInt(args[1]);
        if (isNaN(time)) {
          Logger.log(lang.invalidTime);
          return;
        }
    }

    const players = PlayerInfo.getPlayers();
    if (!players) {
      Logger.log(lang.timeUpdated);
      return;
    }

    for (const client of players) {
      const timepk = new TimePacket()
      timepk.writePacket(client, time);
    }

    Logger.log(lang.timeUpdated);
  }
}

module.exports = CommandTime;
