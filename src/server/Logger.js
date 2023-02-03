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
/* It's a class that logs messages to the console. */
const ServerInfo = require("./ServerInfo");
const lang = ServerInfo.lang;
const config = ServerInfo.config;

class Logger {
  /**
   * It logs a message to the console with a timestamp and a color
   * @param message - The message to log
   * @param [type=info] - The type.
   */
  log(message, type = "info") {
    const d = new Date();
    const dStr = `${d.getUTCFullYear()}-${
      d.getUTCMonth() + 1
    }-${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()}`;
    switch (type) {
      case "info":
        console.log(`[${dStr} \x1b[32m${lang.info}\x1b[0m] ${message}`);
        break;
      case "warning":
      case "warn":
        console.log(`[${dStr} \x1b[33m${lang.warning}\x1b[0m] ${message}`);
        break;
      case "error":
      case "err":
        console.log(`[${dStr} \x1b[31m${lang.error}\x1b[0m] ${message}`);
        break;
      case "debug":
        if (process.env.DEBUG == "minecraft-protocol" || config.debug)
          console.log(`[${dStr} \x1b[35m${lang.debug}\x1b[0m] ${message}`);
        break;
      default:
        throw new Error("Invalid log level");
    }
  }

  /**
   * It logs a message to the console
   * @param [type=info] - The type of log message. This can be "info", "warn", "error", or "debug".
   * @param plugin - The name of the plugin that is logging.
   * @param message - The message to be logged
   * @param [prefix] - The prefix to add to the log message.
   * @param [suffix] - The suffix to add to the plugin name.
   */
  pluginLog(type = "info", plugin, message, prefix = "", suffix = "") {
    const d = new Date();
    const dStr = `${d.getUTCFullYear()}-${
      d.getUTCMonth() + 1
    }-${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()}`;

    switch (type) {
      case "info":
        console.log(
          `[${dStr} \x1b[32m${lang.info}\x1b[0m] ${prefix}${plugin}${suffix} ${message}`
        );
        break;
      case "warning":
      case "warn":
        console.log(
          `[${dStr} \x1b[33m${lang.warning}\x1b[0m] ${prefix}${plugin}${suffix} ${message}`
        );
        break;
      case "error":
      case "err":
        console.log(
          `[${dStr} ${lang.error}] ${prefix}${plugin}${suffix} ${message}`
        );
        break;
      case "debug":
        if (process.env.DEBUG == "minecraft-protocol" || config.debug)
          console.log(
            `[${dStr} \x1b[35m${lang.debug}\x1b[0m] ${prefix}${plugin}${suffix} ${message}`
          );
        break;
      default:
        throw new Error("Invalid log level");
    }
  }
}

module.exports = Logger;
