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
/* It loads plugins. */
const fs = require("fs");
const Logger = require("../server/Logger");
const CheckPluginFolder = require("../plugins/CheckPluginFolder");
const ServerInfo = require("../server/ServerInfo");
const PluginManager = require("../server/PluginManager");
const CCS = require("../server/ConsoleCommandSender");
const lang = ServerInfo.lang;

module.exports = {
  /**
   * It loads all the plugins in the plugins folder.
   */
  async loadPlugins() {
    Logger.log(lang.loadingPlugins);

    CheckPluginFolder.check();

    fs.readdir("./plugins", (err, plugins) => {
      try {
        plugins.forEach((plugin) => {
          try {
            this.loadPlugin(plugin);
          } catch (e) {
            Logger.log(
              lang.failedToLoadPlugin
                .replace("%name%", require(`../../plugins/${plugin}`).name)
                .replace("%errorstack%", e.stack),
              "error"
            );
          } finally {
            Logger.log(
              lang.loadedPlugin
                .replace("%name%", plugin)
                .replace(
                  "%version%",
                  require(`../../plugins/${plugin}`).version
                )
            );
          }
        });
      } finally {
        CCS.start();
      }
    });
  },

  /**
   * It loads a plugin.
   * @param plugin - The plugin name
   */
  loadPlugin(plugin) {
    Logger.log(lang.loadingPlugin.replace("%plugin%", plugin));

    // Check if there is getName() and getVersion() method
    // The plugin will throw an error if not
    require(`../../plugins/${plugin}`).name;
    require(`../../plugins/${plugin}`).version;

    PluginManager.addPlugin(require(`../../plugins/${plugin}`).name);

    require(`../../plugins/${plugin}`).onLoad();
  }
}
