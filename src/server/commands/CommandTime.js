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

const { players } = require("../../player/PlayerInfo");
const { lang, config } = require("../../server/ServerInfo");

class CommandTime extends require("./Command") {
  name() {
    return lang.commands.time;
  }

  aliases() {
    return null;
  }

  execute(args) {
    if (!config.consoleCommandTime) {
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

    for (const client of players) {
      client.setTime(time);
    }

    Logger.log(lang.commands.timeUpdated);
  }
}

module.exports = CommandTime;
