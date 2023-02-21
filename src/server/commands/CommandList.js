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
const PlayerInfo = require("../../player/PlayerInfo");
const Logger = require("../Logger");
const { lang, config } = require("../ServerInfo");

class CommandList extends require("./Command") {
  name() {
    return lang.commands.listc;
  }

  aliases() {
    return null;
  }

  execute(isconsole = true, client) {
    if (!config.consoleCommandList) {
      Logger.log(lang.errors.unknownCommand);
      return;
    }

    let players = "";

    for (let i = 0; i < PlayerInfo.players.length; i++) {
      if (!PlayerInfo.players[i].offline) {
        if (!players) {
          players = PlayerInfo.players[i].username;
        } else {
          players = players + " " + PlayerInfo.players[i].username;
        }
      }
    }

    if (!isconsole) {
      client.sendMessage(
        lang.commands.playerlist.replace(
          "%info%",
          `${PlayerInfo.players.length}/${config.maxPlayers}`
        )
      );
      if (Number(PlayerInfo.players.length) > 0) {
        client.sendMessage(players);
      }
      return;
    }

    Logger.log(
      lang.commands.playerlist.replace(
        "%info%",
        `${PlayerInfo.players.length}/${config.maxPlayers}`
      )
    );
    if (Number(PlayerInfo.players.length) > 0) {
      Logger.log(players);
    }
  }

  getPlayerDescription() {
    return lang.commands.ingameListDescription;
  }

  executePlayer(client) {
    if (!config.playerCommandList) {
      client.sendMessage(lang.errors.playerUnknownCommand);
      return;
    }

    this.execute(false, client);
  }
}

module.exports = CommandList;
