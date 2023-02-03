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
const PlayerInfo = require("../player/PlayerInfo");
const Unloader = require("../plugins/Unloader");
const lang = require("../server/ServerInfo").lang;

class ShutdownAPI {
  /**
   * It closes the console, logs a message, and then kicks all players
   */
  async shutdown() {
    const Log = require("../server/Logger");
    const Logger = new Log();
    const CCS = require("./ConsoleCommandSender");

    await new CCS().close();
    Logger.log(lang.stoppingServer, "info");
    try {
      for (let i = 0; i < new PlayerInfo().getPlayers().length; i++) {
        await new PlayerInfo().getPlayers()[i].kick(lang.serverShutdown);
      }
    } catch (e) {
      /* ignored  */
    }
    setTimeout(() => {
      new Unloader().shutdown();
    }, 2000);
  }
}

module.exports = ShutdownAPI;
