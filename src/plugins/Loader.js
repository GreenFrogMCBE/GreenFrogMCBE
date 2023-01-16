const fs = require("fs");
const Logger = require("../console/Logger");
const CheckPluginFolder = require("./CheckPluginFolder");
const ServerInfo = require("../api/ServerInfo");
const PluginManager = require("../api/PluginManager");
const lang = ServerInfo.lang;
const CCS = require("../console/ConsoleCommandSender");

class Loader {
  constructor() {}

  loadPlugins() {
    CheckPluginFolder.prototype.check();

    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        Logger.prototype.log(lang.loadingplugin.replace("%plugin%", plugin));
        try {
          try {
            require(`../../plugins/${plugin}`).prototype.getName();
          } catch (e) {
            throw new Error(lang.nopluginname.replace("%plugin%", plugin));
          }

          try {
            if (
              require(`../../plugins/${plugin}`).prototype.getServerVersion() ==
              !ServerInfo.majorserverversion
            ) {
              Logger.prototype.log(
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
            Logger.prototype.log(
              lang.pluginhasnogetserverversion.replace("%plugin%", plugin),
              "warning"
            );
          }

          let version = lang.unknown;
          try {
            version = require(`../../plugins/${plugin}`).prototype.getVersion();
          } catch (e) {
            Logger.prototype.log(
              lang.pluginhasnogetversion.replace("%plugin%", plugin),
              "warning"
            );
          }

          PluginManager.prototype.addPlugin(
            require(`../../plugins/${plugin}`).prototype.getName()
          );

          require(`../../plugins/${plugin}`).prototype.onLoad();
        } catch (e) {
          let version = lang.unknown;
          try {
            version = require(`../../plugins/${plugin}`).prototype.getVersion();
          } catch (e) {
            Logger.prototype.log(
              lang.failedtoloadplugin
                .replace("%errorstack%", e.stack)
                .replace("%version%", version)
                .replace(
                  "%name%",
                  require(`../../plugins/${plugin}`).prototype.getName()
                ),
              "error"
            );
          }
        }
      });
      Logger.prototype.log(lang.allpluginsloaded);
      CCS.prototype.start();
    });
  }
}

module.exports = Loader;
