const CommandVerifier = require("../utils/CommandVerifier");

const { getKey } = require("../utils/Language");

/**
 * Command to change the player's game mode.
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
    data: {
        name: getKey("commands.gamemode.name"),
        description: getKey("commands.gamemode.description"),
        minArg: 1,
        maxArg: 1
    },

    execute(_server, player, args) {
        if (player.isConsole) {
            player.sendMessage(getKey("commands.internalError.badSender"));
            return;
        }

        if (!player.op) {
            player.sendMessage(getKey("commands.unknown"));
            return;
        }

        if (CommandVerifier.checkCommand(player, this.data)) return;

        const gamemodeMap = {
            "0": "survival",
            "1": "creative",
            "2": "adventure",
            "3": "spectator",
            "5": "fallback"
        };

        const gamemode = gamemodeMap[args[0]];
        if (!gamemode) {
            player.sendMessage(getKey("commands.gamemode.execution.failed"));
            return;
        }

        try {
            player.setGamemode(gamemode);

            const gmStr = gamemode.charAt(0).toUpperCase() + gamemode.slice(1)

            player.sendMessage(getKey("commands.gamemode.execution.success.updated").replace("%s%", gmStr));
            player.sendMessage(getKey("commands.gamemode.execution.success.set").replace("%s%", gmStr))
        } catch {
            player.sendMessage(getKey("commands.gamemode.execution.invalidGamemode"));
        }
    }
};
