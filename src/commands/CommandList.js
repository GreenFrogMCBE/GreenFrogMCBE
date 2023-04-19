const Frog = require("../Frog");

const { players } = require("../api/player/PlayerInfo");

const { getKey } = require("../utils/Language");

const { serverConfigurationFiles } = Frog
const { config } = serverConfigurationFiles

/**
 * Command to list players currently on the server.
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
    data: {
        name: getKey("commands.list.name"),
        description: getKey("commands.list.description"),
        minArg: 0,
        maxArg: 0,
    },

    execute(_server, player) {
        const playerCount = players.length;
        const playerList = players.map((p) => p.username).join(", ");

        player.sendMessage(getKey("commands.list.execution.success.commandList").replace("%s%", `${playerCount}/${config.serverInfo.maxPlayers}`).replace("%d%", playerList));
    },
};
