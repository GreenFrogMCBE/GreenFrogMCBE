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
const lang = require("../ServerInfo").lang;
const commands = require("../ServerInfo").commands;
const fs = require("fs");
const log = require("../Logger");
const Logger = new log();

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
      else {
        Logger.log(lang.opFail);
      }
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
    if (!args.split(" ")[1]) {
      client.sendMessage("§c" + lang.commandUsageOp);
      return;
    }

    fs.appendFile("ops.yml", args.split(" ")[1] + "\n", (err) => {
      if (!err)
        client.sendMessage(lang.opped.replace("%player%", args.split(" ")[1]));
      else {
        client.sendMessage("§c" + lang.opFail);
      }
    });
  }
}

module.exports = CommandOp;
