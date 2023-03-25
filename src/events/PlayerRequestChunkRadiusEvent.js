const Event = require("./Event");

class PlayerRequestChunkRadiusEvent extends Event {
  constructor() {
    super();
    this.cancelled = false;
    this.name = "PlayerRequestChunkRadiusEvent";
    this.worldSettings = null
    this.server = null
    this.player = null
    this.radius = null
  }

  cancel() {
    this.cancelled = true;
  }

  async execute() {
    this._execute()

    if (!this.cancelled) {
      this.player.setChunkRadius(this.worldSettings.chunkLoadRadius);
    }
  }
}

module.exports = PlayerRequestChunkRadiusEvent;