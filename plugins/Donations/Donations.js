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
const Logger = require("../../src/server/Logger");

module.exports = {
  name: "Donations",
  version: "1.4",

  onShutdown() {
    Logger.log("Donations > Bye!");
  },

  onLoad() {
    const config = require("../../config.json");
    switch (config.lang) {
      case "fr_FR":
        Logger.log(
          `Donations > Si vous avez trouvé ce projet utile, vous pouvez le soutenir ici: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`
        );
        break;
      case "vi_VN":
        Logger.log(
          `Donations > Chào bạn! Nếu bạn muốn hỗ trợ GreenFrogMCBE, bạn có thể quyên góp tại: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`
        );
        break;
      case "lt_LT":
        Logger.log(
          `Donations > Jei šis projektas jums pasirodė naudingas, galite jį paremti čia: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`
        );
        break;
      case "uk_UA":
        Logger.log(
          `Donations > Якщо ви вважаєте цей проект корисним, ви можете підтримати його тут: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`
        );
        break;
      default:
        Logger.log(
          `Donations > If you found this project useful, you can support it here: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`
        );
        break;
    }
  },
};
