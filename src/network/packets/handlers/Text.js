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
const { lang, config } = require("../../../server/ServerInfo");

class Text extends require("./Handler") {
  handle(client, packet) {
    if (config.disable) return;
    const msg = packet.data.params.message;
    const fullmsg = lang.chat.chatFormat.replace("%username%", client.username).replace("%message%", msg);
    if (
      msg.includes("§") ||
      msg.length == 0 ||
      (msg.length > 255 && config.blockInvalidMessages)
    ) {
      Logger.log(
        lang.errors.illegalMessage
          .replace("%msg%", msg)
          .replace("%player%", client.username),
        "warning"
      );
      client.kick(lang.kickmessages.invalidChatMessage);
      return;
    }

    if (!msg.replace(/\s/g, "").length) return;

    Logger.log(lang.chat.chatMessage.replace("%message%", fullmsg));

    for (const player of PlayerInfo.players) {
      player.sendMessage(fullmsg);
    }
  }
}

module.exports = Text;
