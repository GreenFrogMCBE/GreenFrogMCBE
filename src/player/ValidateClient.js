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
const Logger = require("../server/Logger");
const { lang, config } = require("../server/ServerInfo");

module.exports = {
  /**
   * Validates the client
   * @param {Object} client 
   */
  initAndValidateClient(client) {
    client.ip = client.connection.address.split("/")[0];
    client.port = client.connection.address.split("/")[1];
    client.fullip = client.connection.address;
    client.username = client.getUserData().displayName;
    client.offline = false;
    client.items = [];
    client.gamemode = config.gamemode;
    client.op = false;

    if (client.username.includes(" ")) {
      new Logger().log(
        lang.errors.invalidUsernameWarning.replace("%player%", client.username),
        "warning"
      );
      client.usernameold = client.username;
      client.username = client.username.replace(" ", "_");
    }

    if (client.username.length > 16 || client.username.length < 3) {
      client.kick(lang.errors.invalidUsername);
    }

    Logger.log(
      lang.playerstatuses.playerConnected
        .replace("%player%", client.username)
        .replace("%ip%", client.fullip)
    );
  },
};
