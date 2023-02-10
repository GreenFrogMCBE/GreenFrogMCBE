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

const { lang, commands } = require("../../server/ServerInfo");

class CommandTime extends require("./Command") {
  name() {
    return lang.commands.Time;
  }

  aliases() {
    return null
  }

  execute(args) {
    if (!commands.console_command_time) {
      Logger.log(lang.errors.unknownCommand);
      return;
    }

    if (!args) {
      Logger.log(lang.commands.UsageTime);
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
          Logger.log(lang.errors.invalidTime);
          return;
        }
    }

    const players = PlayerInfo.getPlayers();
    if (!players) {
      Logger.log(lang.commands.timeUpdated);
      return;
    }

    for (const client of players) {
      const timepk = new TimePacket();
      timepk.setTime(time)
      timepk.send(client)
    }

    Logger.log(lang.commands.timeUpdated);
  }
}

module.exports = CommandTime;
