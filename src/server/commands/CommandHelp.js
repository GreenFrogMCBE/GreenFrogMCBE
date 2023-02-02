const log = require("../Logger");
const Logger = new log();

const lang = require("../ServerInfo").lang;
const commands = require("../ServerInfo").commands;

class CommandHelp extends require("./Command") {
  name() {
    return lang.command_help;
  }

  aliases() {
    return ["?"];
  }

  execute() {
    if (!commands.console_command_help) {
      Logger.log(lang.unknownCommand);
      return;
    }

    Logger.log(lang.commandList);

    const commandHelps = [
      { command: "kick", help: lang.kickHelp },
      { command: "time", help: lang.timeHelp },
      { command: "stop", help: lang.shutdownHelp },
      { command: "stop", help: lang.stopHelp },
      { command: "help", help: lang.helpHelp },
      { command: "help", help: lang.qmHelp },
      { command: "version", help: lang.versionHelp },
      { command: "version", help: lang.verHelp },
      { command: "pl", help: lang.plHelp },
      { command: "plugins", help: lang.pluginsHelp },
      { command: "op", help: lang.opHelp },
    ];

    for (const help of commandHelps) {
      if ("console_command_" + commands[help.command]) {
        Logger.log(
          help.help
            .replace("%green%", "\x1b[32m")
            .replace("%cyan%", "\x1b[36m")
            .replace("%white%", "\x1b[0m")
            .replace("%blue%", "\x1b[34m") + "\x1b[0m"
        );
      }
    }
  }
}

module.exports = CommandHelp;
