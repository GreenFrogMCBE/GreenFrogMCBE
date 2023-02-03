
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
const log = require("../server/Logger");
const Logger = new log();
const CheckPluginFolder = require("../plugins/CheckPluginFolder");
const ServerInfo = require("../server/ServerInfo");
const PluginManager = require("../server/PluginManager");
const lang = ServerInfo.lang;
const CCS = require("../server/ConsoleCommandSender");

class Loader {
  constructor() {}

  /**
   * It loads all the plugins in the plugins folder.
   */
  async loadPlugins() {
    Logger.log(lang.loadingPlugins);

    CheckPluginFolder.prototype.check();

    fs.readdir("./plugins", (err, plugins) => {
      try {
        plugins.forEach((plugin) => {
          try {
            this.loadPlugin(plugin);
          } catch (e) {
            Logger.log(
              lang.failedToLoadPlugin
                .replace("%name%", plugin)
                .replace("%errorstack%", e.stack),
              "error"
            );
          } finally {
            Logger.log(
              lang.loadedPlugin
                .replace("%name%", plugin)
                .replace(
                  "%version%",
                  require(`../../plugins/${plugin}`).prototype.getVersion()
                )
            );
          }
        });
      } finally {
        CCS.prototype.start();
      }
    });
  }

  /**
   * It loads a plugin.
   * @param plugin - The plugin name
   */
  loadPlugin(plugin) {
    Logger.log(lang.loadingPlugin.replace("%plugin%", plugin));

    require(`../../plugins/${plugin}`).prototype.getName();
    require(`../../plugins/${plugin}`).prototype.getVersion();

    try {
      if (
        require(`../../plugins/${plugin}`).prototype.getServerVersion() ==
        !ServerInfo.majorserverversion
      ) {
        Logger.log(
          lang.tpismf
            .replace(
              "%plugin%",
              require(`../../plugins/${plugin}`).prototype.getName()
            )
            .replace(
              "%psv%",
              require(`../../plugins/${plugin}`).prototype.getServerVersion()
            )
            .replace("%msv%", ServerInfo.majorserverversion),
          "warning"
        );
      }
    } catch (e) {
      Logger.log(
        lang.pluginHasNoGetServerVersion.replace("%plugin%", plugin),
        "warning"
      );
    }

    PluginManager.prototype.addPlugin(
      require(`../../plugins/${plugin}`).prototype.getName()
    );

    require(`../../plugins/${plugin}`).prototype.onLoad();
  }
}

module.exports = Loader;
