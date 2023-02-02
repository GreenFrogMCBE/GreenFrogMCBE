const Logger = require("../../../server/Logger");
const lang = require("../../../server/ServerInfo").lang;

class Unhandled extends require("./Handler") {
  validate() {}

  handle(packet) {
    Logger.prototype.log(
      `${lang.ignoredPacket.replace("%packet%", packet.data.name)}`,
      "debug"
    );
  }
}

module.exports = Unhandled;
