const Colors = require("../Colors");
const Colors2 = require("../../player/Colors");
const PluginManager = require("../PluginManager");

const lang = require("../ServerInfo").lang;
const commands = require("../ServerInfo").commands;

const log = require("../Logger");
const Logger = new log();

class CommandPl extends require("./Command") {
  name() {
    return lang.commandPl;
  }

  aliases() {
    return [lang.commandPlugins];
  }

  execute() {
    if (!commands.console_command_plugins) {
      Logger.log(lang.playerunknowncommand);
      return;
    }
    let plugins;
    if (PluginManager.prototype.getPlugins() == null) {
      plugins = 0;
    } else {
      plugins = PluginManager.prototype.getPlugins().length;
    }

    let pluginlist = "";
    for (
      let i = 0;
      i < PluginManager.prototype.getPlugins().toString().split(",").length;
      i++
    ) {
      pluginlist =
        pluginlist +
        Colors.CONSOLE_GREEN +
        PluginManager.prototype.getPlugins().toString().split(",")[i] +
        Colors.CONSOLE_RESET +
        ", ";
    }

    Logger.log(
      `${lang.plugins} (${plugins}): ${pluginlist ?? ""} ${
        Colors.CONSOLE_RESET
      }`,
      "info"
    );
  }

  getPlayerDescription() {
    return lang.ingamePlDescription;
  }

  executePlayer(player) {
    if (!commands.player_command_plugins) {
      Logger.log(lang.unknown_command);
      return;
    }
    let plugins;
    if (PluginManager.prototype.getPlugins() == null) {
      plugins = 0;
    } else {
      plugins = PluginManager.prototype.getPlugins().length;
    }

    let pluginlist = "";
    for (
      let i = 0;
      i < PluginManager.prototype.getPlugins().toString().split(",").length;
      i++
    ) {
      pluginlist =
        pluginlist +
        Colors2.green +
        PluginManager.prototype.getPlugins().toString().split(",")[i] +
        Colors2.reset +
        ", ";
    }

    player.sendMessage(
      `${lang.plugins} (${plugins}): ${pluginlist ?? ""} ${Colors2.reset}`,
      "info"
    );
  }
}

module.exports = CommandPl;
