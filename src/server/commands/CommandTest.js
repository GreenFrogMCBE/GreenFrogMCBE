const Logger = require("../Logger");

module.exports = {
	/**
	 *
	 * @param {import('../../../types/Server')} server
	 */
	runAsConsole() {
		Logger.log("Hello.", "info");
	},

	run(_server, player) {
		player.sendMessage("Hello.");
	},

	/**
	 * @type {import('../../base/Command').Options}
	 */
	data: {
		name: "test",
		description: "Test command.",
		minArg: 1,
		maxArg: 2,
	},
};
