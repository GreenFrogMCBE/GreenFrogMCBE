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
/* It checks if the config.json, commands.json and language files are valid JSON files. */
const Logger = require("../server/Logger");
const { config } = require("../server/ServerInfo");

module.exports = {
  /**
   * It checks if the language files are valid JSON files
   */
  async ValidateLangFiles() {
    const files = [
      "../lang/en_US.json",
      "../lang/lt_LT.json",
      "../lang/uk_UA.json",
      "../lang/vi_VN.json",
      "../lang/fr_FR.json",
    ];

    for (const file of files) {
      try {
        JSON.parse(JSON.stringify(require(file)));
      } catch (e) {
        Logger.log(
          `Failed to load or parse language file ${file} | Error: ${e.stack}`,
          "error"
        );
        process.exit(config.crashCode);
      }
    }
  },
};
