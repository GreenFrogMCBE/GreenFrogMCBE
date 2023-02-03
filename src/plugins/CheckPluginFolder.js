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
/* It checks if the plugin folder exists, if not, it creates it. */
const fs = require("fs");
const log = require("../server/Logger");
const Logger = new log();
const ServerInfo = require("../server/ServerInfo");

class CheckPluginFolder {
  constructor() {}

  /**
   * It checks if the plugin folder exists, if it doesn't, it creates it. Then it checks if the plugin
   * config folder exists, if it doesn't, it creates it.
   */
  check() {
    const lang = ServerInfo.lang;
    const config = ServerInfo.config;

    try {
      fs.readdirSync("./plugins/");
    } catch (e) {
      try {
        fs.mkdirSync("./plugins/", { recursive: true });
      } catch (e) {
        Logger.log(lang.ftcpf.replace("%error%", e), "error");
        process.exit(config.crashstatuscode);
      }
    }

    try {
      fs.readdirSync("./pluginconfigs");
    } catch (e) {
      try {
        fs.mkdirSync("./pluginconfigs", { recursive: true });
      } catch (e) {
        Logger.log(lang.pcfcf.replace("%error%", e), "error");
        process.exit(config.crashstatuscode);
      }
    }
  }
}

module.exports = CheckPluginFolder;
