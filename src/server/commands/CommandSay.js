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
const { lang, commands } = require("../../server/ServerInfo")
const TextPacket = require("../../network/packets/Text");
const PlayerInfo = require("../../player/PlayerInfo");
const Logger = require("../Logger");


class CommandSay extends require("./Command") {
  name() {
    return lang.commandSay;
  }

  aliases() {}

  execute(args) {
    if (!commands.console_command_say) {
      Logger.log(lang.unknownCommand);
      return;
    }
    if (!args) {
      Logger.log(lang.commandUsageSay);
      return;
    }

    let msg = lang.sayCommandFormat
      .replace(`%message%`, args)
      .replace(`%sender%`, "Server");

    for (let i = 1; i < PlayerInfo.getPlayers().length; i++) {
      let client = PlayerInfo.getPlayers()[i];
      TextPacket.writePacket(client, msg);
    }

    Logger.log(msg);
  }

  getPlayerDescription() {
    return lang.inGameSayDescription;
  }

  executePlayer(client, args) {
    if (!commands.player_command_say) {
      client.sendMessage(lang.playerUnknownCommand);
      return;
    }
    if (!client.op) {
      client.sendMessage(lang.noPermission);
      return;
    }
    if (!args.split(" ")[1]) {
      client.sendMessage("§c" + lang.commandUsageSay);
      return;
    }
    args = args.split(" ")[1];

    let msg = lang.sayCommandFormat
      .replace(`%message%`, args)
      .replace(`%sender%`, client.username);

    for (let i = 0; i < PlayerInfo.getPlayers().length; i++) {
      Logger.log(msg);
      const text = new TextPacket();
      text.setMessage(msg);
      text.send(PlayerInfo.getPlayers()[i]);
    }
  }
}

module.exports = CommandSay;
