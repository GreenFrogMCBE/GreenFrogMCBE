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
const GameMode = require("../../player/GameMode");
const { lang } = require("../ServerInfo");
const Command = require("./Command");

class CommandGamemode extends Command {
  name() {
    return lang.commands.gamemode;
  }

  aliases() {
    return null;
  }

  getPlayerDescription() {
    return lang.commands.ingameGamemodeDescription;
  }

  executePlayer(client, gamemode) {
    const gamemodeArg = gamemode.split(" ")[1];
    if (!gamemodeArg) {
      client.sendMessage(lang.commands.usageGamemode);
      return;
    }

    const gamemodeMap = {
      s: GameMode.SURVIVAL,
      survival: GameMode.SURVIVAL,
      c: GameMode.CREATIVE,
      creative: GameMode.CREATIVE,
      a: GameMode.ADVENTURE,
      adventure: GameMode.ADVENTURE,
      sp: GameMode.SPECTATOR,
      spectator: GameMode.SPECTATOR,
    };

    const selectedGamemode = gamemodeMap[gamemodeArg.toLowerCase()];
    if (selectedGamemode == null) {
      const numdata = parseInt(gamemodeArg);
      switch (numdata) {
        case 0:
          client.sendMessage(lang.commands.gamemodeSurvival);
          client.sendMessage(lang.commands.setOwnGamemodeSurvival);
          client.setGamemode(GameMode.SURVIVAL);
          break;
        case 1:
          client.sendMessage(lang.commands.gamemodeCreative);
          client.sendMessage(lang.commands.setOwnGamemodeCreative);
          client.setGamemode(GameMode.CREATIVE);
          break;
        case 2:
          client.sendMessage(lang.commands.gamemodeAdventure);
          client.sendMessage(lang.commands.setOwnGamemodeAdventure);
          client.setGamemode(GameMode.ADVENTURE);
          break;
        case 3:
        case 6:
          client.sendMessage(lang.commands.gamemodeSpectator);
          client.sendMessage(lang.commands.setOwnGamemodeSpectator);
          client.setGamemode(GameMode.SPECTATOR);
          break;
        default:
          client.sendMessage(
            lang.commands.gamemodeInvalid.replace("%gm%", gamemodeArg)
          );
          break;
      }
    } else {
      const selectedGamemodeName =
        selectedGamemode.charAt(0).toUpperCase() + selectedGamemode.slice(1);
      client.sendMessage(
        `${lang.commands.gamemodeUpdated}${selectedGamemodeName}`
      );
      client.sendMessage(
        `${lang.commands.setOwnGamemode}${selectedGamemodeName}`
      );
      client.setGamemode(selectedGamemode);
    }
  }
}

module.exports = CommandGamemode;
