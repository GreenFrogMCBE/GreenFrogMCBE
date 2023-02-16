/* eslint-disable no-unused-vars */
const Event = require('./Event')
const Logger = require('../../server/Logger');
const { config, lang } = require('../../server/ServerInfo')
const CommandPl = require("../../server/commands/CommandPl");
const CommandOp = require("../../server/commands/CommandOp");
const CommandManager = require("../../player/CommandManager");
const CommandSay = require("../../server/commands/CommandSay");
const CommandList = require('../../server/commands/CommandList')
const CommandTime = require('../../server/commands/CommandTime')
const CommandKick = require('../../server/commands/CommandKick');
const CommandDeop = require('../../server/commands/CommandDeop');
const CommandVersion = require("../../server/commands/CommandVersion");
const CommandShutdown = require("../../server/commands/CommandShutdown");
const FailedToHandleEvent = require('./exceptions/FailedToHandleEvent')

const fs = require('fs');
const CommandMe = require('../../server/commands/CommandMe');


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
      const cmdKick = new CommandKick();
      const cmdTime = new CommandTime()
      const cmdDeop = new CommandDeop()
      const cmdList = new CommandList()
      const cmdMe = new CommandMe()

      if (message.startsWith(`/${lang.commands.ver.toLowerCase()}`) || message.startsWith(`/${lang.commands.version.toLowerCase()}`) ) {
        cmdVer.executePlayer(client);
      } else if (message.startsWith(`/${lang.commands.pl.toLowerCase()}`) || message.startsWith(`/${lang.commands.plugins.toLowerCase()}`)) {
        cmdPl.executePlayer(client);
      } else if (message.startsWith(`/${lang.commands.stop.toLowerCase()}`)) {
        cmdStop.executePlayer(client);
      } else if (message.startsWith(`/${lang.commands.say.toLowerCase()}`)) {
        cmdSay.executePlayer(client, message);
      } else if (message.startsWith(`/${lang.commands.op.toLowerCase()}`)) {
        cmdOp.executePlayer(client, message);
      } else if (message.startsWith(`/${lang.commands.kick.toLowerCase()}`)) {
        cmdKick.executePlayer(client, message)
      } else if (message.startsWith(`/${lang.commands.time.toLowerCase()}`)) {
        cmdTime.executePlayer(client, message)
      } else if (message.startsWith(`/${lang.commands.deop.toLowerCase()}`)) {
        cmdDeop.executePlayer(client, message)
      } else if (message.startsWith(`/${lang.commands.listc.toLowerCase()}`)) {
        cmdList.executePlayer(client)
      } else if (message.startsWith(`/${lang.commands.me.toLowerCase()}`)) {
        cmdMe.executePlayer(client, message)
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