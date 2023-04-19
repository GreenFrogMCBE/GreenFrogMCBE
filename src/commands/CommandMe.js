const PlayerInfo = require("../api/player/PlayerInfo");

const CommandVerifier = require("../utils/CommandVerifier");
const { getKey } = require("../utils/Language");

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
        maxArg: undefined,
        minArgs: 1
    },

    execute(_server, player, args) {
        if (CommandVerifier.checkCommand(player, this.data)) {
            return;
        }

        const msg = getKey("chat.format.me").replace("%s%", player.username).replace("%d%", args.join(" "))

        for (const p of PlayerInfo.players) {
            p.sendMessage(msg);
        }

        player.sendMessage(msg);
    },
};
