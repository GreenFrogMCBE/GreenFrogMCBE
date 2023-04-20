const PlayerInfo = require("../api/player/PlayerInfo");

const { getKey } = require("../utils/Language");

/**
 * Command to perform an action in the chat as the player.
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
    data: {
        name: getKey("commands.me.name"),
        description: getKey("commands.me.description"),
        maxArgs: undefined,
        minArgs: 1
    },

    execute(_server, player, args) {
        const msg = getKey("chat.format.me").replace("%s%", player.username).replace("%d%", args.join(" "))

        for (const p of PlayerInfo.players) {
            p.sendMessage(msg);
        }
    },
};
