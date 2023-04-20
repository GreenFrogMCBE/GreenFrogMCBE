const Frog = require("../Frog");

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
		minArgs: 0,
		maxArgs: 0,
        requiresOp: true
	},

	execute() {
		Frog.shutdownServer();
	},
};
