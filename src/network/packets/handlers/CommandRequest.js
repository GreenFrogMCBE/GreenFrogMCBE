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
const CommandManager = require("../../../player/CommandManager");
const CommandPl = require("../../../server/commands/CommandPl");
const CommandSay = require("../../../server/commands/CommandSay");
const CommandShutdown = require("../../../server/commands/CommandShutdown");
const CommandVersion = require("../../../server/commands/CommandVersion");
const CommandOp = require("../../../server/commands/CommandOp");
const Events = require("../../../server/Events");
const Logger = require("../../../server/Logger");
const PacketHandlingError = require("../exceptions/PacketHandlingError");
const lang = require("../../../server/ServerInfo").lang;

class CommandRequest extends require("./Handler") {
  validate(cmd) {
    if (!cmd) {
      throw new PacketHandlingError("Missing command in command request");
    }

    if (!cmd.trim().length) {
      throw new PacketHandlingError(
        "Command cannot be empty or whitespace only"
      );
    }

    if (cmd.length > 256) {
      throw new PacketHandlingError(
        "Command exceeded maximum length of 256 characters"
      );
    }
  }

  handle(client, packet) {
    let cmd = packet.data.params.command;
    this.validate(cmd);
    new Events().executeOC2(require("../../../Server"), client, cmd);
    new Logger().log(
      lang.executedCmd
        .replace("%player%", client.username)
        .replace("%cmd%", cmd)
    );

    const cmdManager = new CommandManager();
    const cmdVer = new CommandVersion();
    const cmdPl = new CommandPl();
    const cmdStop = new CommandShutdown();
    const cmdSay = new CommandSay();
    const cmdOp = new CommandOp();

    if (
      cmd.startsWith(`/${lang.commandVer.toLowerCase()}`) ||
      cmd.startsWith(`/${lang.commandVersion.toLowerCase()}`)
    ) {
      cmdVer.executePlayer(client);
    } else if (
      cmd.startsWith(`/${lang.commandPl.toLowerCase()}`) ||
      cmd.startsWith(`/${lang.commandPlugins.toLowerCase()}`)
    ) {
      cmdPl.executePlayer(client);
    } else if (cmd.startsWith(`/${lang.commandStop.toLowerCase()}`)) {
      cmdStop.executePlayer(client);
    } else if (cmd.startsWith(`/${lang.commandSay.toLowerCase()}`)) {
      cmdSay.executePlayer(client, cmd);
    } else if (cmd.startsWith(`/${lang.commandOp.toLowerCase()}`)) {
      cmdOp.executePlayer(client, cmd);
    } else {
      let exists = false;
      for (let i = 0; i < cmdManager.getCommands().length; i++) {
        if (`/${cmdManager.getCommands()[i].name.toLowerCase()}` === cmd) {
          exists = true;
          break;
        }
      }
      if (!exists) client.sendMessage(lang.playerUnknownCommand);
    }
  }
}

module.exports = CommandRequest;
