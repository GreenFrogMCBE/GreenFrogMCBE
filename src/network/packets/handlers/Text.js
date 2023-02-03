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
    let msg = packet.data.params.message;
    let fullmsg = lang.chatFormat
      .replace("%username%", client.username)
      .replace("%message%", msg);
    Events.prototype.executeOC(require("../../../Server"), client, msg); // (c) bestcodequality inc 2023
    if (
      msg.includes("§") ||
      msg.length == 0 ||
      (msg.length > 255 && ServerInfo.config.invalidmsgsblock)
    ) {
      Logger.prototype.log(
        lang.illegalMessage
          .replace("%msg%", msg)
          .replace("%player%", client.username),
        "warning"
      );
      client.kick(lang.invalidChatMessage);
      return;
    }

    if (!msg.replace(/\s/g, "").length) return;

    Logger.prototype.log(lang.chatMessage.replace("%message%", fullmsg));

    for (let i = 0; i < PlayerInfo.prototype.getPlayers().length; i++) {
      PlayerInfo.prototype.getPlayers()[i].sendMessage(fullmsg);
    }
  }
}

module.exports = Text;
