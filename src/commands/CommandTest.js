const Logger = require("../Logger");

/**
 * @type {import('../../base/Command').Command}
 */	
module.exports = {
	runAsConsole() {
		Logger.log("Hello.", "info");
	},

	run(_server, player) {
		player.sendMessage("Hello.");
	},

	data: {
		name: "test",
		description: "Test command.",
		minArg: 1,
		maxArg: 2,
	},
};
