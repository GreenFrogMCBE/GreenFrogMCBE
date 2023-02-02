const lang = require("../../server/ServerInfo").lang;
const commands = require("../../server/ServerInfo").commands;
const ShutdownAPI = require("../ShutdownAPI");

class CommandShutdown extends require("./Command") {
  name() {
    return lang.commandStop;
  }

  aliases() {}

  execute() {
    const servershutdown = new ShutdownAPI();
    servershutdown.shutdown();
  }

  getPlayerDescription() {
    return lang.ingameStopDescription;
  }

  executePlayer(client) {
    if (!commands.player_command_stop) {
      client.sendMessage(lang.playerUnknownCommand);
      return;
    }
    if (!client.op) {
      client.sendMessage(lang.noPermission);
      return;
    }
    this.execute();
  }
}

module.exports = CommandShutdown;
