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
const Logger = require("../Logger");

const { lang, config } = require("../../server/ServerInfo");

class CommandHelp extends require("./Command") {
  name() {
    return lang.commands.commandHelp;
  }

  aliases() {
    return ["?"];
  }

  execute() {
    Logger.log(lang.commands.list);

    const commandHelps = [
      { command: "?", help: lang.commands.qmHelp },
      { command: "op", help: lang.commands.opHelp },
      { command: "pl", help: lang.commands.plHelp },
      { command: "ver", help: lang.commands.verHelp },
      { command: "kick", help: lang.commands.kickHelp },
      { command: "time", help: lang.commands.timeHelp },
      { command: "stop", help: lang.commands.stopHelp },
      { command: "help", help: lang.commands.helpHelp },
      { command: "version", help: lang.commands.versionHelp },
      { command: "plugins", help: lang.commands.pluginsHelp },
      { command: "shutdown", help: lang.commands.shutdownHelp },
    ];

    let commandsfound = false;
    for (const help of commandHelps) {
      if (
        config[
          `consoleCommand${
            help.command.charAt(0).toUpperCase() + help.command.slice(1)
          }`
        ]
      ) {
        commandsfound = true;
        Logger.log(
          help.help
            .replace("%green%", "\x1b[32m")
            .replace("%cyan%", "\x1b[36m")
            .replace("%white%", "\x1b[0m")
            .replace("%blue%", "\x1b[34m") + "\x1b[0m"
        );
      }
    }

    if (!commandsfound) Logger.log(lang.commands.thereAreNoCommands);
  }
}

module.exports = CommandHelp;
