const { players, maxPlayers } = require("../api/player/PlayerInfo");

/**
 * Command to list players currently on the server.
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
    data: {
        name: "list",
        description: "Lists players on the server.",
        minArg: 0,
        maxArg: 0,
    },

    execute(_server, player) {
        const playerCount = players.length;
        const playerList = players.map((p) => p.username).join(", ");

        player.sendMessage(`There are ${playerCount}/${maxPlayers} players online: ${playerList}`);
    },
};
