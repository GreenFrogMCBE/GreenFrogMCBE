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
const PlayerInfo = require("../../player/PlayerInfo");
const Logger = require("../Logger");

class CommandSay extends require("./Command") {
  name() {
    return lang.commands.say;
  }

  aliases() {
    return null;
  }

  execute(args) {
    if (!config.consoleCommandSay) {
      Logger.log(lang.errors.unknownCommand);
      return;
    }
    if (!args) {
      Logger.log(lang.commands.usageSay);
      return;
    }

    let msg = lang.commands.sayCommandFormat
      .replace(`%message%`, args)
      .replace(`%sender%`, "Server");

    for (let i = 1; i < PlayerInfo.getPlayers.length; i++) {
      let client = PlayerInfo.getPlayers()[i];
      client.sendMessage(msg);
    }

    Logger.log(msg);
  }

  getPlayerDescription() {
    return lang.commands.ingameSayDescription;
  }

  executePlayer(client, args) {
    if (!config.playerCommandSay) {
      client.sendMessage(lang.errors.playerUnknownCommand);
      return;
    }

    if (!client.op) {
      client.sendMessage(lang.errors.noPermission)
      return
    }

    if (!args.split(" ")[1]) {
      client.sendMessage("§c" + lang.commands.usageSay);
      return;
    }
    args = args.split(" ")[1];

    let msg = lang.commands.sayCommandFormat
      .replace(`%message%`, args)
      .replace(`%sender%`, client.username);

    for (let i = 0; i < PlayerInfo.players.length; i++) {
      client.sendMessage(msg);
    }
    Logger.log(msg);
  }
}

module.exports = CommandSay;
