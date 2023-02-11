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
const Logger = require("../../server/Logger");

const { lang, config } = require("../../server/ServerInfo");
const { get } = require("../../player/PlayerInfo");

class CommandKick extends require("./Command") {
  name() {
    return lang.commands.Kick;
  }

  aliases() {
    return null;
  }

  execute(args) {
    if (!config.consoleCommandKick) {
      Logger.log(lang.commands.unknownCommand);
      return;
    }

    if (!args || !args[0]) {
      Logger.log(lang.commands.UsageKick);
      return;
    }

    const targetUsername = args[0];
    const reason = args[1] || lang.kickmessages.noReason;

    const target = get(targetUsername);

    if (target) {
      target.kick(`${lang.kickmessages.kickedPrefix}${reason}`);
      Logger.log(
        `${lang.kickmessages.kickedConsoleMsg
          .replace("%player%", targetUsername)
          .replace("%reason%", reason)}`,
        "info"
      );
    } else {
      Logger.log(lang.errors.playerOffline, "info");
    }
  }
}

module.exports = CommandKick;
