const Frog = require("../Frog");

const CommandVerifier = require("../utils/CommandVerifier");

const { getKey } = require("../utils/Language");

/**
 * Command to shutdown the server.
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
	data: {
		name: getKey("commands.stop.name"),
		description: getKey("commands.stop.description"),
		minArg: 0,
		maxArg: 0,
	},

	execute(_server, player) {
		if (CommandVerifier.checkCommand(player, this.data)) {
			return;
		}

		if (!player.op) {
            player.sendMessage(getKey("commands.unknown"));
            return;
        }

		if (player.isConsole) {
			Frog.shutdownServer();
			return
		}

		CommandVerifier.throwError(player, this.data);
	},
};