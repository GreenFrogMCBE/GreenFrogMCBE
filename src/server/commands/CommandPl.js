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

const { lang, config } = require("../../server/ServerInfo");

const Logger = require("../Logger");

class CommandPl extends require("./Command") {
  name() {
    return lang.commands.Pl;
  }

  aliases() {
    return [lang.commands.Plugins];
  }

  execute() {
    if (!config.consoleCommandPlugins) {
      Logger.log(lang.errors.playerUnknownCommand);
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
      `${lang.commands.Plugins} (${plugins}): ${pluginlist ?? ""} ${
        ColorsServer.CONSOLE_RESET
      }`
    );
  }

  getPlayerDescription() {
    return lang.commands.ingamePlDescription;
  }

  executePlayer(player) {
    if (!config.playerCommandPlugins) {
      Logger.log(lang.errors.unknownCommand);
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
        ColorsPlayer.white +
        ", ";
    }
    player.sendMessage(
      `${lang.commands.plugins} (${plugins}): ${pluginlist ?? ""} ${
        ColorsPlayer.reset
      }`,
      "info"
    );
  }
}

module.exports = CommandPl;
