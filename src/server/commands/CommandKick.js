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
const PlayerInfo = require("../../player/PlayerInfo");
const Logger = require("../../server/Logger");

const { lang, commands } = require("../../server/ServerInfo");

class CommandKick extends require("./Command") {
  name() {
    return lang.command_kick;
  }

  aliases() {
    return null;
  }

  execute(args) {
    if (!commands.console_command_kick) {
      Logger.log(lang.commands.unknownCommand);
      return;
    }

    if (!args || !args[0]) {
      Logger.log(lang.commands.commandUsageKick, "info");
      return;
    }

    const targetUsername = args[0];
    const reason = args[1] || lang.noPlayer;
    const players = PlayerInfo.getPlayers();

    const target = players.find((client) => client.username === targetUsername);

    if (target) {
      target.disconnect(`${lang.kickedPrefix}${reason}`);
      Logger.log(
        `${lang.kickedConsoleMsg
          .replace("%args[0]%", targetUsername)
          .replace("%args[1]%", reason)}`,
        "info"
      );
    } else {
      Logger.log(lang.playerOffline, "info");
    }
  }
}

module.exports = CommandKick;
