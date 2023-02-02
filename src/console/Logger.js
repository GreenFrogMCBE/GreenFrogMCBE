const ServerInfo = require("../api/ServerInfo");
const lang = ServerInfo.lang;
const config = ServerInfo.config;

class Logger {
  constructor() {}

  log(message, type = "info") {
    const d = new Date();
    const dStr = `${d.getUTCFullYear()}-${
      d.getUTCMonth() + 1
    }-${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()}`;
    switch (type) {
      case "info":
        console.log(`[${dStr} \x1b[32mINFO\x1b[0m] ${message}`);
        break;
      case "warning":
      case "warn":
        console.log(`[${dStr} \x1b[33mWARN\x1b[0m] ${message}`);
        break;
      case "error":
      case "err":
        console.log(`[${dStr} \x1b[31mERROR\x1b[0m] ${message}`);
        break;
      case "debug":
        if (config.debug) {
          console.log(`[${dStr} DEBUG] ${message}`);
        }
        break;
      default:
        console.log(lang.invalid);
        break;
    }
  }

  pluginLog(type = "info", plugin, message, prefix = "", suffix = "") {
    const d = new Date();
    const dStr = `${d.getUTCFullYear()}-${
      d.getUTCMonth() + 1
    }-${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()}`;

    switch (type) {
      case "info":
        console.log(
          `[${dStr} \x1b[32mINFO\x1b[0m] ${prefix}${plugin}${suffix} ${message}`
        );
        break;
      case "warning":
      case "warn":
        console.log(
          `[${dStr} \x1b[33mWARN\x1b[0m] ${prefix}${plugin}${suffix} ${message}`
        );
        break;
      case "error":
      case "err":
        console.log(`[${dStr} DEBUG] ${prefix}${plugin}${suffix} ${message}`);
        break;
      case "debug":
        if (config.debug) {
          console.log(
            `[${dStr} \x1b[32mINFO\x1b[0m] ${prefix}${plugin}${suffix} ${message}`
          );
        }
        break;
      default:
        throw new Error(`Invalid log level: ${type}`);
    }
  }
}

module.exports = Logger;
