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
/* It shuts down the plugins. */
const fs = require("fs");
const Logger = require("../server/Logger");
const ServerInfo = require("../server/ServerInfo");

class Unloader {
  constructor() { }

  /* Shuts down the plugins. */
  async shutdown() {
    const lang = ServerInfo.lang;
    const config = ServerInfo.config;

    Logger.log(lang.shuttingDownPlugins);
    fs.readdir("./plugins", (err, plugins) => {
      try {
        plugins.forEach((plugin) => {
          try {
            Logger.log(lang.unloadingPlugin.replace("%plugin%", plugin));
            const plugin1 = require(`../../plugins/${plugin}`);
            plugin1.onShutdown();
          } catch (e) {
            Logger.log(lang.failedToShutdownPlugin.replace("%plugin%", plugin).replace("%e%", e.stack), "error");
          }
        });
      } finally {
        Logger.log(lang.doneShuttingDownPlugins);
        Logger.log(lang.doneShuttingDown)
        process.exit(config.exitstatuscode)
      }
    });
  }
}

module.exports = Unloader;
