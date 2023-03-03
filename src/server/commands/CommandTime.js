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

  getPlayerDescription() {
    return lang.commands.ingameTimeDescription;
  }

  execute(args) {
    if (!args) {
      Logger.log(lang.commands.usageTime);
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
          Logger.log(lang.commands.usageTime);
          return;
        }
    }

    for (const client of players) {
      client.setTime(time);
    }

    Logger.log(lang.commands.timeUpdated);
  }

  executePlayer(client, args) {
    if (!config.consoleCommandTime) {
      client.sendMessage("§c" + lang.errors.unknownCommand);
      return;
    }

    let time = args.split(" ")[1];
    switch (time) {
      case "day":
        time = 1000;
        break;
      case "night":
        time = 17000;
        break;
      default:
        time = parseInt(args.split(" ")[1]);
        if (isNaN(time)) {
          client.sendMessage("§c" + lang.commands.usageTime);
          return;
        }
    }

    for (const client of players) {
      client.setTime(time);
    }

    client.sendMessage(lang.commands.timeUpdated);
  }
}

module.exports = CommandTime;
