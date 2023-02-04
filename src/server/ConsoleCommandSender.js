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
const Shutdown = require("./commands/CommandShutdown");
const Kick = require("./commands/CommandKick");
const Version = require("./commands/CommandVersion");
const Help = require("./commands/CommandHelp");
const Time = require("./commands/CommandTime");
const Say = require("./commands/CommandSay");
const Op = require("./commands/CommandOp");
const PL = require("./commands/CommandPl");

let closed1 = false;

module.exports = {
  closed: closed1,

  close() {
    closed1 = true;
  },

  async start() {
    const lang = ServerInfo.lang;
    const commands = {
      shutdown: new Shutdown(),
      kick: new Kick(),
      version: new Version(),
      help: new Help(),
      time: new Time(),
      say: new Say(),
      op: new Op(),
      pl: new PL(),
    };

    const r = rl.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    r.setPrompt("> ");
    r.prompt(true);

    r.on("line", (data) => {
      if (data.toLowerCase().startsWith(`${lang.commandTime.toLowerCase()} `)) {
        commands.time.execute(data.split(" "));
        return;
      }

      if (data.toLowerCase().startsWith(`${lang.commandSay.toLowerCase()} `)) {
        const msg = data.split(" ").slice(1).join(" ");
        commands.say.execute(msg);
        return;
      }

      if (data.toLowerCase().startsWith(`${lang.commandKick.toLowerCase()} `)) {
        const dataParts = data.split(" ");
        const target = dataParts[1];
        const reason = dataParts.slice(2).join(" ");
        commands.kick.execute([target, reason]);
        return;
      }

      if (data.toLowerCase().startsWith(`${lang.commandOp.toLowerCase()} `)) {
        commands.op.execute(data.split(" ")[1]);
        return;
      }

      Events.executeOCC(data, require("../Server").getServer());
      const command = data.toLowerCase().split(" ")[0];

      switch (command) {
        case "":
          break;
        case lang.commandShutdown.toLowerCase():
        case lang.commandStop.toLowerCase():
          commands.shutdown.execute();
          break;
        case lang.commandOp.toLowerCase():
          commands.op.execute(data.split(" ")[1]);
          break;
        case lang.commandKick.toLowerCase():
          const reason = data.split(" ").slice(2).join(" ");
          commands.kick.execute(data.split(" ")[1], reason);
          break;
        case lang.commandPl.toLowerCase():
        case lang.commandPlugins.toLowerCase():
          commands.pl.execute();
          break;
        case lang.commandVer.toLowerCase():
        case lang.commandVersion.toLowerCase():
          commands.version.execute();
          break;
        case lang.commandTime.toLowerCase():
          commands.time.execute();
          break;
        case lang.commandSay.toLowerCase():
          const msg = data.split(" ").slice(1).join(" ");
          commands.say.execute(msg);
          break;
        case "?":
        case lang.commandHelp.toLowerCase():
          commands.help.execute();
          break;
        default:
          Logger.log(lang.unknownCommand);
          break;
      }

      if (!closed1) r.prompt(true);
    });
  },
};
