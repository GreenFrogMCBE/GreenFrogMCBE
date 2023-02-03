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
/* It's a class that handles console commands. */
const rl = require("readline");
const Logger = require("./Logger");
const ServerInfo = require("../server/ServerInfo");
const Events = require("./Events");
const CommandShutdown = require("./commands/CommandShutdown");
const CommandKick = require("./commands/CommandKick");
const CommandPl = require("./commands/CommandPl");
const CommandVersion = require("./commands/CommandVersion");
const CommandHelp = require("./commands/CommandHelp");
const CommandTime = require("./commands/CommandTime");
const CommandSay = require("./commands/CommandSay");
const CommandOp = require("./commands/CommandOp");

class ConsoleCommandSender {
  constructor() {
    this.closed = false;
  }

  /**
   * Close() {
   *         this.closed = true
   * }
   */
  close() {
    this.closed = true;
  }

  /**
   * It's a function that allows you to execute commands in the console.
   */
  async start() {
    const lang = ServerInfo.lang;
    const shutdowncmd = new CommandShutdown();
    const kickcmd = new CommandKick();
    const vercmd = new CommandVersion();
    const helpcmd = new CommandHelp();
    const timecmd = new CommandTime();
    const saycmd = new CommandSay();
    const opcmd = new CommandOp();
    const plcmd = new CommandPl();

    const r = rl.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    r.setPrompt("> ");
    r.prompt(true);

    r.on("line", (data) => {
      Events.prototype.executeOCC(
        data,
        require("../Server").prototype.getServer()
      );
      if (data.toLowerCase().startsWith(`${lang.commandTime.toLowerCase()} `)) {
        timecmd.execute(data.split(" "));
        return;
      }

      if (data.toLowerCase().startsWith(`${lang.commandSay.toLowerCase()} `)) {
        let msg = "";
        for (let i = 1; i < data.split(" ").length; i++) {
          if (msg.length < 1) {
            msg = data.split(" ")[i];
          } else {
            msg = msg + " " + data.split(" ")[i];
          }
        }
        saycmd.execute(msg);
        return;
      }

      if (data.toLowerCase().startsWith(`${lang.commandKick.toLowerCase()} `)) {
        let reason = "";
        for (let i = 2; i < data.split(" ").length; i++) {
          if (reason.length < 1) {
            reason = data.split(" ")[i];
          } else {
            reason = reason + " " + data.split(" ")[i];
          }
        }
        kickcmd.execute([data.split(" ")[1], reason]);
        return;
      }

      if (data.toLowerCase().startsWith(`${lang.commandOp.toLowerCase()} `)) {
        opcmd.execute(data.split(" ")[1]);
        return;
      }

      switch (data.toLowerCase()) {
        case "":
          break;
        case lang.commandShutdown.toLowerCase():
        case lang.commandStop.toLowerCase():
          shutdowncmd.execute();
          break;
        case lang.commandOp.toLowerCase():
          opcmd.execute();
          break;
        case lang.commandKick.toLowerCase():
          kickcmd.execute(null);
          break;
        case lang.commandPl.toLowerCase():
        case lang.commandPlugins.toLowerCase():
          plcmd.execute();
          break;
        case lang.commandVer.toLowerCase():
        case lang.commandVersion.toLowerCase():
          vercmd.execute();
          break;
        case lang.commandTime.toLowerCase():
          timecmd.execute();
          break;
        case lang.commandSay.toLowerCase():
          saycmd.execute();
          break;
        case "?":
        case lang.commandHelp.toLowerCase():
          helpcmd.execute();
          break;
        default:
          Logger.prototype.log(lang.unknownCommand);
          break;
      }
      if (!this.closed) r.prompt(true);
    });
  }
}

module.exports = ConsoleCommandSender;
