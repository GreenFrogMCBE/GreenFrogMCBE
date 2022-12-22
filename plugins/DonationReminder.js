const BasePlugin = require("../src/api/BasePlugin");
const Logger = require("../src/console/Logger");

class DonationReminder extends BasePlugin {
  getName() {
    return "DonationReminder";
  }

  getServerVersion() {
    return "1.2";
  }

  getVersion() {
    return "1.0";
  }

  onLoad() {
    Logger.prototype.log(
      `[DonationReminder] Hi there! If you want to support GreenFrogMCBE you can donate at: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`,
      "info"
    );
    Logger.prototype.log(
      `[DonationReminder] You will also be listed in our Discord server!`,
      "info"
    );
    Logger.prototype.log(
      `[DonationReminder] If you do not want to support us just delete the DonationPlugin.js from plugins folder`
    );
  }
}

module.exports = DonationReminder;
