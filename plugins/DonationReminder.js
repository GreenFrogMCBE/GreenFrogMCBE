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
    const config = require('../config.json')
    switch (config.lang) {
      case 'en_US':
        this.logMsg(`Hi there! If you want to support GreenFrogMCBE you can donate at: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`);
        this.logMsg(`You will also be marked as donator in our Discord server!`);
        this.logMsg(`If you do not want to support us just delete the DonationPlugin.js from plugins folder`);
        break;
      case 'lt_LT':
        // WARNING: I used Google translate for this lang
        this.logMsg(`Sveiki! Jei norite paremti GreenFrogMCBE, galite aukoti adresu: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`);
        this.logMsg(`Taip pat mūsų Discord serveryje būsite pažymėtas kaip donoras!`);
        this.logMsg(`Jei nenorite mūsų palaikyti, tiesiog ištrinkite DonationPlugin.js iš papildinių aplanko`);
        break;
      case 'uk_UA':
        this.logMsg(`Привіт! Якщо ви хочете підтримати GreenFrogMCBE, ви можете зробити пожертву за адресою: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`);
        this.logMsg(`Ви також будете посначені як донатор в нашому сервері Discord!`);
        this.logMsg(`Якщо ви не хочете підтримувати нас, просто видаліть DonationPlugin.js із папки плагінів`);
        break;
      case 'fr_FR':
        // WARNING: I used Google translate for this lang
        this.logMsg(`Bonjour à tous! Si vous souhaitez soutenir GreenFrogMCBE, vous pouvez faire un don sur: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`);
        this.logMsg(`Vous serez également marqué comme donateur sur notre serveur Discord!`);
        this.logMsg(`Si vous ne voulez pas nous soutenir, supprimez simplement le DonationPlugin.js du dossier plugins`);
        break;
      default:
        this.logMsg(`Hi there! If you want to support GreenFrogMCBE you can donate at: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`);
        this.logMsg(`You will also be marked as donator in our Discord server!`);
        this.logMsg(`If you do not want to support us just delete the DonationPlugin.js from plugins folder`);
        break;
    }
  }
}

module.exports = DonationReminder
