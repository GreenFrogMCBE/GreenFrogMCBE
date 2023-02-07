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
const ColorsServer = require("../Colors");
const ColorsPlayer = require("../../player/Colors");
const PluginManager = require("../../plugin/PluginManager");

const { lang, commands } = require("../../server/ServerInfo")

const Logger = require("../Logger");

class CommandPl extends require("./Command") {
  name() {
    return lang.commandPl;
  }

  aliases() {
    return [lang.commandPlugins];
  }

  execute() {
    if (!commands.console_command_plugins) {
      Logger.log(lang.playerUnknownCommand);
      return;
    }
    let plugins;
    if (PluginManager.getPlugins() == null) {
      plugins = 0;
    } else {
      plugins = PluginManager.getPlugins().length;
    }

    let pluginlist = "";
    for (
      let i = 0;
      i < PluginManager.getPlugins().toString().split(",").length;
      i++
    ) {
      pluginlist =
        pluginlist +
        ColorsServer.CONSOLE_GREEN +
        PluginManager.getPlugins().toString().split(",")[i] +
        ColorsServer.CONSOLE_RESET +
        ", ";
    }

    Logger.log(
      `${lang.plugins} (${plugins}): ${pluginlist ?? ""} ${
        ColorsServer.CONSOLE_RESET
      }`,
      "info"
    );
  }

  getPlayerDescription() {
    return lang.ingamePlDescription;
  }

  executePlayer(player) {
    if (!commands.player_command_plugins) {
      Logger.log(lang.unknownCommand);
      return;
    }
    let plugins;
    if (PluginManager.getPlugins() == null) {
      plugins = 0;
    } else {
      plugins = PluginManager.getPlugins().length;
    }

    let pluginlist = "";
    for (
      let i = 0;
      i < PluginManager.getPlugins().toString().split(",").length;
      i++
    ) {
      pluginlist =
        pluginlist +
        ColorsPlayer.green +
        PluginManager.getPlugins().toString().split(",")[i] +
        ColorsPlayer.reset +
        ", ";
    }

    player.sendMessage(
      `${lang.plugins} (${plugins}): ${pluginlist ?? ""} ${ColorsPlayer.reset}`,
      "info"
    );
  }
}

module.exports = CommandPl;
