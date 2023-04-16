const CommandVerifier = require("../utils/CommandVerifier");

/**
 * Command to change the player's game mode.
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
    execute(server, player, args) {
        if (player.isConsole) {
            player.sendMessage("§cYou can't execute this command from console")
            return
        }

        if (args === []) {
            player.sendMessage("§cPlease enter a gamemode")
            return
        }

        if (CommandVerifier.checkCommand(player, this.data)) return;

        try {
            player.setGamemode("survival");

            player.sendMessage(`Your game mode has been updated to ${args[0]}.`);
        } catch {
            player.sendMessage("§cInvalid gamemode!")
        }
    },

    data: {
        name: "gamemode",
        description: "Changes the player's game mode",
        aliases: ["gm"],
        minArg: 1,
        maxArg: 1
    }
};
