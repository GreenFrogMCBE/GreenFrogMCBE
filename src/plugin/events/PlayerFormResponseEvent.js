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

class PlayerFormResponseEvent extends Event {
  constructor() {
    super();
    this.cancelled = false;
    this.name = "PlayerFormResponseEvent";
  }

  execute(server, client, data) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}/../../../plugins/${plugin}`).PlayerFormResponseEvent(
            server,
            client,
            data,
            this
          );
        } catch (e) {
          FailedToHandleEvent.handleEventError(e, plugin, this.name);
        }
      });
    });
  }
}

module.exports = PlayerFormResponseEvent;
