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
const ServerInfo = require("../server/ServerInfo");

module.exports = {
  /**
   * It checks if the config.json file exists, and if it does, it checks if it's valid JSON
   */
  async ValidateConfig() {
    try {
      const config = require("../../config.json");
      JSON.parse(JSON.stringify(config));
    } catch (error) {
      console.error(
        `Failed to load or parse config.json | Error: ${error.stack}`
      );
      process.exit(-1);
    }
  },

  /**
   * It checks if the commands.json file is valid JSON.
   */
  async ValidateCommands() {
    try {
      const commands = require("../../commands.json");
      JSON.parse(JSON.stringify(commands));
    } catch (error) {
      console.error(
        `Failed to load or parse commands.json | Error: ${error.stack}`
      );
      process.exit(-1);
    }
  },

  /**
   * It checks if the language files are valid JSON files
   */
  async ValidateLangFile() {
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
          `Failed to load and parse language file ${file} | Error: ${e.stack}`
        );
        process.exit(ServerInfo.config.crashstatuscode);
      }
    }
  },
};
