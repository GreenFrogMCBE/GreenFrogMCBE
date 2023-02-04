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
const lang = require("../../server/ServerInfo").lang;
const commands = require("../../server/ServerInfo").commands;
const Logger = require("../Logger");

class CommandOp extends require("./Command") {
  name() {
    return lang.commandOp;
  }

  aliases() {}

  execute(args) {
    if (!commands.console_command_op) {
      Logger.log(lang.unknownCommand);
      return;
    }
    if (!args) {
      Logger.log(lang.commandUsageOp);
      return;
    }

    fs.appendFile("ops.yml", args + "\n", (err) => {
      if (!err) Logger.log(lang.opped.replace("%player%", args));
      else Logger.log(lang.opFail);
    });
  }

  getPlayerDescription() {
    return lang.ingameOpDescription;
  }

  executePlayer(client, args) {
    if (!client.op) {
      client.sendMessage(lang.noPermission);
      return;
    }

    const player = args.split(" ")[1];
    if (!player) {
      client.sendMessage("§c" + lang.commandUsageOp);
      return;
    }

    fs.appendFile("ops.yml", player + "\n", (err) => {
      if (!err) client.sendMessage(lang.opped.replace("%player%", player));
      else client.sendMessage("§c" + lang.opFail);
    });
  }
}

module.exports = CommandOp;
