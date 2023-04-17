const CommandVerifier = require("../utils/CommandVerifier");

/**
 * Command to change the player's game mode.
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
    data: {
        name: "gamemode",
        description: "Sets a player's game mode",
        aliases: ["gm"],
        minArg: 1,
        maxArg: 1
    },

    execute(server, player, args) {
        if (player.isConsole) {
            player.sendMessage("§cYou can't execute this command from console");
            return;
        }

        if (args.length === 0) {
            player.sendMessage("§cPlease enter a gamemode");
            return;
        }

        if (CommandVerifier.checkCommand(player, this.data)) return;

        const gamemodeMap = {
            "0": "survival",
            "1": "creative",
            "2": "adventure",
            "5": "fallback",
            "6": "spectator"
        };

        const gamemode = gamemodeMap[args[0]];
        if (!gamemode) {
            player.sendMessage("§cInvalid gamemode!");
            return;
        }

        try {
            player.setGamemode(gamemode);

            player.sendMessage(`Your game mode has been updated to ${gamemode.charAt(0).toUpperCase()}${gamemode.slice(1)}.`);
            player.sendMessage(`Set own gamemode to ${gamemode.charAt(0).toUpperCase()}${gamemode.slice(1)}.`);
        } catch {
            player.sendMessage("§cInvalid gamemode!");
        }
    }
};
