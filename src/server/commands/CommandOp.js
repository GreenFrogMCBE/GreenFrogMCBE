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
const fs = require("fs");
const Logger = require("../Logger");
const { lang, commands } = require("../../server/ServerInfo");

class CommandOp extends require("./Command") {
  name() {
    return lang.Op;
  }

  aliases() {
    return null;
  }

  execute(args) {
    if (!commands.consoleCommandOp) {
      Logger.log(lang.errors.unknownCommand);
      return;
    }
    if (!args) {
      Logger.log(lang.commands.UsageOp);
      return;
    }

    fs.appendFile("ops.yml", args + "\n", (err) => {
      if (!err) Logger.log(lang.commands.opped.replace("%player%", args));
      else Logger.log(lang.commands.opFail);
    });
  }

  getPlayerDescription() {
    return lang.commands.ingameOpDescription;
  }

  executePlayer(client, args) {
    if (!client.op) {
      client.sendMessage(lang.errors.noPermission);
      return;
    }

    const player = args.split(" ")[1];
    if (!player) {
      client.sendMessage("§c" + lang.commands.commandUsageOp);
      return;
    }

    fs.appendFile("ops.yml", player + "\n", (err) => {
      if (!err)
        client.sendMessage(lang.commands.opped.replace("%player%", player));
      else client.sendMessage("§c" + lang.commands.opFail);
    });
  }
}

module.exports = CommandOp;
