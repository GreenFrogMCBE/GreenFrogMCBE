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
/* eslint-disable no-unused-vars */
const FailedToHandleEvent = require("./exceptions/FailedToHandleEvent");
const { lang, config } = require("../../server/ServerInfo");
const PlayerInfo = require("../../player/PlayerInfo");
const Logger = require("../../server/Logger");
const Event = require("./Event");

const fs = require("fs");

class PlayerChatEvent extends Event {
  constructor() {
    super();
    this.cancelled = false;
    this.name = "PlayerChatEvent";
  }

  cancel() {
    this.cancelled = true;
  }

  execute(server, client, message) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}\\..\\..\\..\\plugins\\${plugin}`).PlayerChatEvent(
            server,
            client,
            message,
            this
          );
        } catch (e) {
          FailedToHandleEvent.handleEventError(e, plugin, this.name);
        }
      });
    });
    this.postExecute(client, message);
  }

  isCancelled() {
    return this.cancelled;
  }

  postExecute(client, message) {
    if (!this.isCancelled() || !config.disable) {
      const fullmessage = lang.chat.chatFormat
        .replace("%username%", client.username)
        .replace("%message%", message);
      if (!message.replace(/\s/g, "").length) return;

      if (
        message.includes("§") ||
        message.length === 0 ||
        (message.length > 256 && config.blockInvalidMessages)
      ) {
        Logger.log(
          lang.errors.illegalMessage
            .replace("%message%", message)
            .replace("%player%", client.username),
          "warning"
        );
        client.kick(lang.kickmessages.invalidChatMessage);
        return;
      }

      Logger.log(lang.chat.chatMessage.replace("%message%", fullmessage));

      for (const player of PlayerInfo.players) player.sendMessage(fullmessage);
    }
  }
}

module.exports = PlayerChatEvent;
