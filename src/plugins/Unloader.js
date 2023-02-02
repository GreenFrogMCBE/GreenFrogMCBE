/*
░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░


(c) 2023 andriycraft
*/
/* It shuts down the plugins. */
const fs = require("fs");
const ServerInfo = require("../server/ServerInfo");
const log = require("../server/Logger");
const Logger = new log();

class Unloader {
  constructor() {}

  /* Shuts down the plugins. */
  shutdown() {
    const lang = ServerInfo.lang;
    const config = ServerInfo.config;

    fs.readdir("./plugins", (err, plugins) => {
      Logger.log(lang.shuttingDownPlugins);
      try {
        plugins.forEach((plugin) => {
          try {
            require(`../../plugins/${plugin}`).prototype.getName();
          } catch (e) {
            Logger.log(
              lang.failedtoshutdownplugin.replace("%plugin%", plugin),
              "error"
            );
          }

          require(`../../plugins/${plugin}`).prototype.onShutdown();
        });
      } finally {
        Logger.log(lang.doneShuttingDownPlugins);
        Logger.log(lang.doneShuttingDown);
        process.exit(config.exitstatuscode);
      }
    });
  }
}

module.exports = Unloader;
