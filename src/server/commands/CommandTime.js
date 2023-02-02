const log = require("../Logger");
const Logger = new log();
const TimePacket = require("../../network/packets/Time");
const PlayerInfo = require("../../player/PlayerInfo");

const lang = require("../ServerInfo").lang;
const commands = require("../ServerInfo").commands;

class CommandTime extends require("./Command") {
  name() {
    return lang.commandTime;
  }

  aliases() {}

  execute(args) {
    if (!commands.console_command_time) {
      Logger.log(lang.unknownCommand);
      return;
    }
    if (!args) {
      Logger.log(lang.commandUsageTime, "info");
      return;
    }

    let time = args[1];
    switch (time) {
      case "day":
        time = 1000;
        break;
      case "night":
        time = 17000;
        break;
      default:
        time = parseInt(args[1]);
        if (isNaN(time)) {
          Logger.log(lang.invalidTime);
          return;
        }
    }

    const players = PlayerInfo.prototype.getPlayers();
    if (!players) {
      Logger.log(lang.timeUpdated);
      return;
    }

    for (const client of players) {
      TimePacket.prototype.writePacket(client, time);
    }

    Logger.log(lang.timeUpdated);
  }
}

module.exports = CommandTime;
