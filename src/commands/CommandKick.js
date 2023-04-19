const { getKey } = require("../utils/Language");

const PlayerInfo = require("../api/player/PlayerInfo");

const CommandVerifier = require("../utils/CommandVerifier");

module.exports = {
    data: {
        name: getKey("commands.kick.name"),
        description: getKey("commands.kick.description"),
        minArgs: 1,
        maxArgs: 1,
        requiresOp: true
    },

    execute(_server, player, args) {
        if (CommandVerifier.checkCommand(player, this.data)) { return; }

        const playerName = args[0];
        const reason = (args.slice(1).join(' ') || getKey("kickMessages.noReason")).trim();

        const target = PlayerInfo.getPlayer(playerName);

        if (!target) {
            player.sendMessage(getKey("commands.kick.execution.failed.notOnline").replace("%s%", playerName));
            return;
        }

        target.disconnect(getKey("kickMessages.wereKicked").replace("%s%", reason));
    },
};
