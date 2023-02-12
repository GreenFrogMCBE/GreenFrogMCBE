/* eslint-disable no-unused-vars */
const Event = require('./Event')
const Logger = require('../../server/Logger');
const { config, lang } = require('../../server/ServerInfo')
const CommandPl = require("../../server/commands/CommandPl");
const CommandOp = require("../../server/commands/CommandOp");
const CommandManager = require("../../player/CommandManager");
const CommandSay = require("../../server/commands/CommandSay");
const CommandVersion = require("../../server/commands/CommandVersion");
const FailedToHandleEvent = require('./exceptions/FailedToHandleEvent')
const CommandShutdown = require("../../server/commands/CommandShutdown");

const fs = require('fs');

class PlayerCommandExecuteEvent extends Event {
  constructor() {
    super()
    this.cancelled = false
    this.name = 'PlayerCommandExecuteEvent'
  }

  cancel() {
    this.cancelled = true
  }

  execute(server, client, command) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}\\..\\..\\..\\plugins\\${plugin}`).PlayerCommandExecuteEvent(server, client, command, this);
        } catch (e) {
          FailedToHandleEvent.handleEventError(e, plugin, this.name)
        }
      });
    });
    this.postExecute(client, command)
  }

  isCancelled() {
    return this.cancelled
  }

  postExecute(client, message) {
    if (!this.isCancelled() || config.commandsDisabled) {
      Logger.log(
        lang.commands.executedCmd
          .replace("%player%", client.username)
          .replace("%cmd%", message)
      );
  
      const cmdManager = new CommandManager();
      const cmdVer = new CommandVersion();
      const cmdPl = new CommandPl();
      const cmdStop = new CommandShutdown();
      const cmdSay = new CommandSay();
      const cmdOp = new CommandOp();
  
      if (
        message.startsWith(`/${lang.commands.Ver.toLowerCase()}`) ||
        message.startsWith(`/${lang.commands.Version.toLowerCase()}`)
      ) {
        cmdVer.executePlayer(client);
      } else if (
        message.startsWith(`/${lang.commands.Pl.toLowerCase()}`) ||
        message.startsWith(`/${lang.commands.Plugins.toLowerCase()}`)
      ) {
        cmdPl.executePlayer(client);
      } else if (message.startsWith(`/${lang.commands.Stop.toLowerCase()}`)) {
        cmdStop.executePlayer(client);
      } else if (message.startsWith(`/${lang.commands.Say.toLowerCase()}`)) {
        cmdSay.executePlayer(client, message);
      } else if (message.startsWith(`/${lang.commands.Op.toLowerCase()}`)) {
        cmdOp.executePlayer(client, message);
      } else {
        let exists = false;
        for (let i = 0; i < cmdManager.getCommands().length; i++) {
          if (`/${cmdManager.getCommands()[i].name.toLowerCase()}` === message) {
            exists = true;
            break;
          }
        }
        if (!exists) client.sendMessage(lang.errors.playerUnknownCommand);
       }
    }
  }
}

module.exports = PlayerCommandExecuteEvent