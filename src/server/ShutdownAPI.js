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
const CCS = require("./ConsoleCommandSender");
const Log = require("../server/Logger");

const Logger = new Log();

class ShutdownAPI {
  /**
   * It closes the console, logs a message, and then kicks all players
   */
  async shutdownServer() {
    await new CCS().close();
    Logger.log(lang.stoppingServer, "info");

    const players = new PlayerInfo().getPlayers();

    try {
      for (const player of players) {
        await player.kick(lang.serverShutdown);
      }
    } catch (e) {
      /* ignored */
    }

    setTimeout(() => {
      new Unloader().shutdown();
    }, 2000);
  }
}

module.exports = ShutdownAPI;
