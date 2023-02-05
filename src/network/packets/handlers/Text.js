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
const PlayerInfo = require("../../../player/PlayerInfo");
const Logger = require("../../../server/Logger");
const Events = require("../../../server/Events");
const Handler = require("./Handler");
const ServerInfo = require("../../../server/ServerInfo");

class Text extends Handler {
  handle(client, packet, lang) {
    const msg = packet.data.params.message;
    const fullmsg = lang.chatFormat
      .replace("%username%", client.username)
      .replace("%message%", msg);
    Events.executeOC(require("../../../Server"), client, msg); // (c) bestcodequality inc 2023
    if (
      msg.includes("§") ||
      msg.length == 0 ||
      (msg.length > 255 && ServerInfo.config.invalidmsgsblock)
    ) {
      Logger.log(
        lang.illegalMessage
          .replace("%msg%", msg)
          .replace("%player%", client.username),
        "warning"
      );
      client.kick(lang.invalidChatMessage);
      return;
    }

    if (!msg.replace(/\s/g, "").length) return;

    Logger.log(lang.chatMessage.replace("%message%", fullmsg));

    for (const player of PlayerInfo.getPlayers()) {
      player.sendMessage(fullmsg);
    }
  }
}

module.exports = Text;
