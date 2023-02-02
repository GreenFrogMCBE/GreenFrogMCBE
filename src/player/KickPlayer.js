const lang = require("../api/ServerInfo").lang;

class KickPlayer {
  constructor() {}

  kick(client, reason = lang.youweredisconnected) {
    if (!client) throw new Error(lang.apikicknoclient);

    client.kick(reason);
  }
}

module.exports = KickPlayer;
