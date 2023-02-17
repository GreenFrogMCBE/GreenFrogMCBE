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
const Event = require("./Event");
const fs = require("fs");

class PlayerGamemodeChangeEvent extends Event {
  constructor() {
    super();
    this.cancelled = false;
    this.name = "PlayerGamemodeChangeEvent";
  }

  cancel() {
    this.cancelled = true;
  }

  execute(server, client, gamemode) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}/../../../plugins/${plugin}`).PlayerGamemodeChangeEvent(
            server,
            client,
            gamemode,
            this
          );
        } catch (e) {
          FailedToHandleEvent.handleEventError(e, plugin, this.name);
        }
      });
    });
    this.postExecute(client, gamemode);
  }

  isCancelled() {
    return this.cancelled;
  }

  postExecute(client, gamemode) {
    if (!this.isCancelled()) {
      client.oldgamemode = gamemode;
    } else {
      client.setGamemode(client.oldgamemode);
    }
  }
}

module.exports = PlayerGamemodeChangeEvent;
