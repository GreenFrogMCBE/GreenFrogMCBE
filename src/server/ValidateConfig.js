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
const log = require("../server/Logger");
const Logger = new log();

class ValidateConfig {
  constructor() {}

  /**
   * It checks if the config.json file exists, and if it does, it checks if it's valid JSON
   */
  ValidateConfig() {
    try {
      require("../../config.json");
    } catch (e) {
      Logger.log(`Failed to load config.json | Error: ${e.stack}`);
      process.exit(-1);
    }

    try {
      JSON.parse(JSON.stringify(require("../../config.json")));
    } catch (e) {
      Logger.log(`Failed to parse config.json | Error: ${e.stack}`);
      process.exit(-1);
    }
  }

  /**
   * It checks if the commands.json file is valid JSON.
   */

  ValidateCommands() {
    try {
      require("../../commands.json");
    } catch (e) {
      Logger.log(`Failed to load commands.json | Error: ${e.stack}`);
      process.exit(-1);
    }

    try {
      JSON.parse(JSON.stringify(require("../../commands.json")));
    } catch (e) {
      Logger.log(`Failed to parse commands.json | Error: ${e.stack}`);
      process.exit(-1);
    }
  }

  /**
   * It checks if the language files are valid JSON files
   */
  ValidateLangFile() {
    try {
      require("../lang/en_US.json");
      require("../lang/lt_LT.json");
      require("../lang/uk_UA.json");
      require("../lang/vi_VN.json");
      require("../lang/fr_FR.json");
    } catch (e) {
      Logger.log(`Failed to load language file | Error: ${e.stack}`);
      process.exit(-1);
    }

    try {
      JSON.parse(JSON.stringify(require("../lang/en_US.json")));
      JSON.parse(JSON.stringify(require("../lang/lt_LT.json")));
      JSON.parse(JSON.stringify(require("../lang/uk_UA.json")));
      JSON.parse(JSON.stringify(require("../lang/vi_VN.json")));
      JSON.parse(JSON.stringify(require("../lang/fr_FR.json")));
    } catch (e) {
      Logger.log(`Failed to parse language file | Error: ${e.stack}`);
      process.exit(-1);
    }
  }
}

module.exports = ValidateConfig;
