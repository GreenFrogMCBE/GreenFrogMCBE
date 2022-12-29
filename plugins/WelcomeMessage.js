const BasePlugin = require("../src/plugins/BasePlugin");
const Chatmessage = require("../src/player/Chatmessage");
const Logger = require("../src/console/Logger");

class WelcomeMessage extends BasePlugin {
  constructor() { }

  getName() {
    return "WelcomeMessage"
  }

  onLoad() {
    Logger.prototype.log(`WelcomeMessage | This plugin was powered by WWiRRu on GitHub`);
  }

  getServerVersion() {
    return "1.4";
  }

  getVersion() {
    return "PRIVATE"
  }

  onPlayerSpawn(server, client) {
    setTimeout(() => {
      Chatmessage.prototype.sendMessage(client, `§f[§a+§f]§f ${client.userData.displayName}`)
    }, 500) // just in case if the client's device is potato
  }

  // remember: You can just remove the events that u don't use
}

module.exports = WelcomeMessage;