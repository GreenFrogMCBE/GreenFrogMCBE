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
const PacketHandlingError = require("../exceptions/PacketHandlingError");
const CommandShutdown = require("../../../server/commands/CommandShutdown");
const CommandVersion = require("../../../server/commands/CommandVersion");
const CommandOp = require("../../../server/commands/CommandOp");
const Events = require("../../../plugin/Events");
const Logger = require("../../../server/Logger");
const { lang, config } = require("../../../server/ServerInfo");

class CommandRequest extends require("./Handler") {
  validate(cmd) {
    if (!cmd) throw new PacketHandlingError(lang.missingcommand);

    if (!cmd.trim().length) throw new PacketHandlingError(lang.wsonly);

    if (cmd.length > 256) throw new PacketHandlingError(lang.cmdtoolong);
  }

  handle(client, packet) {
    if (config.commandsDisabled) return;
    let cmd = packet.data.params.command;
    this.validate(cmd);
    Events.executeOC2(require("../../../Server").server, client, cmd);
    Logger.log(
      lang.commands.executedCmd
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
      cmd.startsWith(`/${lang.commands.Ver.toLowerCase()}`) ||
      cmd.startsWith(`/${lang.commands.Version.toLowerCase()}`)
    ) {
      cmdVer.executePlayer(client);
    } else if (
      cmd.startsWith(`/${lang.commands.Pl.toLowerCase()}`) ||
      cmd.startsWith(`/${lang.commands.Plugins.toLowerCase()}`)
    ) {
      cmdPl.executePlayer(client);
    } else if (cmd.startsWith(`/${lang.commands.Stop.toLowerCase()}`)) {
      cmdStop.executePlayer(client);
    } else if (cmd.startsWith(`/${lang.commands.Say.toLowerCase()}`)) {
      cmdSay.executePlayer(client, cmd);
    } else if (cmd.startsWith(`/${lang.commands.Op.toLowerCase()}`)) {
      cmdOp.executePlayer(client, cmd);
    } else {
      let exists = false;
      for (let i = 0; i < cmdManager.getCommands().length; i++) {
        if (`/${cmdManager.getCommands()[i].name.toLowerCase()}` === cmd) {
          exists = true;
          break;
        }
      }
      if (!exists) client.sendMessage(lang.errors.playerUnknownCommand);
    }
  }
}

module.exports = CommandRequest;
