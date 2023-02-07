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
const fs = require("fs");
const Logger = require("../server/Logger");
const { lang, config } = require("../server/ServerInfo");
const PluginManager = require("./PluginManager");
const CCH = require("../server/ConsoleCommandSender");

let plugins = [];
let count = 0;

module.exports = {
  loadPlugins() {
    setTimeout(() => {
      CCH.start();
    }, 1000);
    try {
      fs.mkdirSync("./plugins/");
      fs.mkdirSync("./pluginsconfigs/");
    } catch (ignored) {
      /* ignored */
    }

    fs.readdir("./plugins", (err, files) => {
      files.forEach((file) => {
        fs.stat(`${__dirname}/../../plugins/${file}`, (err, stats) => {
          if (stats.isDirectory()) {
            Logger.log(lang.loadingPlugin.replace("%plugin%", file));
            let name,
              version,
              main = null;
            try {
              name =
                require(`${__dirname}/../../plugins/${file}/package.json`).displayName;
              version =
                require(`${__dirname}/../../plugins/${file}/package.json`).version;
              main =
                require(`${__dirname}/../../plugins/${file}/package.json`).main;
            } catch (ignored) {
              Logger.log(
                lang.packageJSONError.replace("%plugin%", file),
                "warning"
              );
            }
            try {
              require(`${__dirname}/../../plugins/${file}/${main}`).onLoad();
              Logger.log(
                lang.loadedPlugin
                  .replace("%name%", name)
                  .replace("%version%", version)
              );
              PluginManager.addPlugin(name);
              count++;
            } catch (e) {
              Logger.log(
                lang.failedToExecFunction
                  .replace("%plugin%", file)
                  .replace("%e%", e.stack),
                "error"
              );
            }
            plugins.push(file);
          }
        });
      });
      if (count === files.length) {
        CCH.start();
      }
    });
  },

  async unloadPlugins() {
    Logger.log(lang.shuttingDownPlugins);
    fs.readdir("./plugins", (err, files) => {
      files.forEach((file) => {
        fs.stat(`${__dirname}/../../plugins/${file}`, (err, stats) => {
          if (stats.isDirectory()) {
            count--;
            let name,
              main = null;
            try {
              main =
                require(`${__dirname}/../../plugins/${file}/package.json`).main;
              name =
                require(`${__dirname}/../../plugins/${file}/package.json`).displayName;
            } catch (ignored) {
              Logger.log(
                lang.packageJSONError.replace("%plugin%", file),
                "warning"
              );
            }
            try {
              Logger.log(lang.unloadingPlugin.replace("%plugin%", name));
              try {
                require(`${__dirname}/../../plugins/${file}/${main}`).onShutdown();
              } finally {
                Logger.log(lang.unloadedPlugin.replace("%plugin%", name));
                if (count <= 0) {
                  Logger.log(lang.doneShuttingDownPlugins);
                  Logger.log(lang.doneShuttingDown);
                  process.exit(config.exitstatuscode);
                }
              }
            } catch (e) {
              Logger.log(
                lang.failedToExecFunction
                  .replace("%plugin%", file)
                  .replace("%e%", e.stack),
                "error"
              );
            }
          }
        });
      });
    });
  },
};
