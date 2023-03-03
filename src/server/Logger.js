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
const LogTypes = require("./LogTypes");
const { lang, config } = require("./ServerInfo");

module.exports = {
  /**
   * It logs a message to the console with a timestamp and a color
   * @param message - The message to log
   * @param [type=info] - The type.
   */
  log(message, type = LogTypes.INFO) {
    const d = new Date();
    const dStr = `${d.getUTCFullYear()}-${
      d.getUTCMonth() + 1
    }-${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()}`;

    const logLevel = {
      info: 32,
      warning: 33,
      warn: 33,
      error: 31,
      err: 31,
      debug: 35,
    };

    const logColor = logLevel[type] || 0;
    if (!logColor) throw new Error(lang.invalidLogType);

    if (
      type === "debug" &&
      !(process.env.DEBUG === "minecraft-protocol" || config.debug)
    )
      return;

    console.log(
      `[${dStr} \x1b[${logColor}m${lang.logger[type]}\x1b[0m] ${message}`
    );
  },
};
