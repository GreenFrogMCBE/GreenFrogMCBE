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
        description: "Displays message about yourself.",
        aliases: [],
        minArg: 1,
        maxArg: undefined,
    },

    execute(_server, player, args) {
        if (CommandVerifier.checkCommand(player, this.data)) {
            return;
        }

        const msg = `* ${player.username} ${args.join(" ")}`;

        for (const p of PlayerInfo.players) {
            p.sendMessage(msg);
        }

        player.sendMessage(msg);
    },
};
