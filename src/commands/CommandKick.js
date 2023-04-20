const { getKey } = require("../utils/Language");

const PlayerInfo = require("../api/player/PlayerInfo");

module.exports = {
    data: {
        name: getKey("commands.kick.name"),
        description: getKey("commands.kick.description"),
        minArgs: 1,
        maxArgs: 1,
        requiresOp: true
    },

    execute(_server, player, args) {
        const playerName = args[0];
        let reason = ': ' + args.slice(1).join(' ')

        if (args.length === 0) {
            reason = ''
        }

        const target = PlayerInfo.get(playerName);

        if (!target) {
            player.sendMessage(getKey("commands.kick.execution.failed.notOnline").replace("%s%", playerName));
            return;
        }

        target.disconnect(getKey("kickMessages.wereKicked").replace("%s%", reason));
    },
};
