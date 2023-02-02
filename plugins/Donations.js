const CommandManager = require("../src/player/CommandManager");
const BasePlugin = require("../src/plugins/BasePlugin");
const Logger = require("../src/server/Logger");

class Donations extends BasePlugin {
  getName() {
    return "Donations";
  }

  getServerVersion() {
    return "1.5";
  }

  getVersion() {
    return "1.2";
  }

  logMsg(msg) {
    Logger.prototype.pluginLog("info", "Donations >", msg, "", "");
  }

  onLoad() {
    const config = require("../config.json");
    switch (config.lang) {
      case "en_US":
        this.logMsg(
          `If you found this project useful, you can support it here: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`
        );
        break;
      case "vi_VN":
        this.logMsg(
          `Chào bạn! Nếu bạn muốn hỗ trợ GreenFrogMCBE, bạn có thể quyên góp tại: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`
        );
        break;
      case "lt_LT":
        this.logMsg(
          `Jei šis projektas jums pasirodė naudingas, galite jį paremti čia: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`
        );
        break;
      case "uk_UA":
        this.logMsg(
          `Якщо ви вважаєте цей проект корисним, ви можете підтримати його тут: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`
        );
        break;
      default:
        this.logMsg(
          `If you found this project useful, you can support it here: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`
        );
        break;
    }
  }
}

module.exports = Donations;
