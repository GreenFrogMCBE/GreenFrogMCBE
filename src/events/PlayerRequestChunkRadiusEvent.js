const fs = require('fs')
const Event = require("./Event");
const FailedToHandleEvent = require("./exceptions/FailedToHandleEvent");
const worldSettings = require("../../world/world_settings.json");

class PlayerRequestChunkRadiusEvent extends Event {
  constructor() {
    super();
    this.cancelled = false;
    this.name = "PlayerRequestChunkRadiusEvent";
  }

  cancel() {
    this.cancelled = true;
  }

  async execute(player, server, radius) {
    await new Promise((resolve) => {
      fs.readdir("./plugins", (err, plugins) => {
        plugins.forEach((plugin) => {
          try {
            require(`${__dirname}/../../../plugins/${plugin}`).PlayerRequestChunkRadiusEvent(
              player,
              server,
              radius,
              this
            );
          } catch (e) {
            FailedToHandleEvent.handleEventError(e, plugin, this.name);
          }
        });
        resolve();
      });
    });

    if (!this.cancelled) {
      player.setChunkRadius(worldSettings.chunkLoadRadius);
    }
  }
}

module.exports = PlayerRequestChunkRadiusEvent;