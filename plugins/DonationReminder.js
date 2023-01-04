const BasePlugin = require("../src/plugins/BasePlugin");
const Logger = require("../src/console/Logger");

class DonationReminder extends BasePlugin {
  getName() {
    return "DonationReminder";
  }

  getServerVersion() {
    return "1.5";
  }

  getVersion() {
    return "1.1";
  }

  logMsg(msg) {
    Logger.prototype.pluginLog(
      'info',
      this.getName(),
      msg,
      '[',
      ']'
    );
  }

  onLoad() {
    this.logMsg(`Trying to get config...`)
    this.logMsg(`Hi there! If you want to support GreenFrogMCBE you can donate at: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`);
    this.logMsg(`You will also be listed in our Discord server!`);
    this.logMsg(`If you do not want to support us just delete the DonationPlugin.js from plugins folder`);
  }

  onShutdown() {
    this.logMsg(`Goodbye!`)
  }
}

module.exports = DonationReminder