const Frog = require("../Frog");
const CommandVerifier = require("../utils/CommandVerifier");

/**
 * Command to shutdown the server.
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
	data: {
		name: "stop",
		description: "Shut downs the server.",
		minArg: 0,
		maxArg: 0,
	},

	execute(_server, player) {
		if (CommandVerifier.checkCommand(player, this.data)) {
			return;
		}

		if (player.isConsole || player.isOp) {
			Frog.shutdownServer();
			return
		}

		CommandVerifier.throwError(player, this.data);
	},
};