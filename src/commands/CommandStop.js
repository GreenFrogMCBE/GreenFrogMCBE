const Frog = require("../Frog");
const CommandVerifier = require("../utils/CommandVerifier");

/**
 * @type {import('../type/Command').Command}
 */
module.exports = {
	execute(_server, player) {
		if (CommandVerifier.checkCommand(player, this.data)) return

		if (player.isConsole || player.isOp) {
			Frog.shutdownServer()
		} else {
			CommandVerifier.throwError(player, this.data)
		}
	},

	data: {
		name: "stop",
		description: "Shutdowns the server",
		minArg: 0,
		maxArg: 0,
	},
};
