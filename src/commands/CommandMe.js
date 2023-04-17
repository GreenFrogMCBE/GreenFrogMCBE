const PlayerInfo = require("../api/player/PlayerInfo");

const CommandVerifier = require("../utils/CommandVerifier");

/**
 * Command to perform an action in the chat as the player.
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
    data: {
        name: "me",
        description: "Performs an action in the chat as the player.",
        aliases: [],
        minArg: 1,
        maxArg: 1,
    },

    execute(_server, player, args) {
        if (CommandVerifier.checkCommand(player, this.data)) {
            return;
        }

        const message = args[0];
        const msg = `* ${player.username} ${message}`;

        for (const p of PlayerInfo.players) {
            p.sendMessage(msg);
        }

        player.sendMessage(msg);
    },
};
