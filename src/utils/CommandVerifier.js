const Language = require("./Language");

module.exports = {
	/**
	 * Sends a unknown command (or no permission) error to the command executor.
	 *
	 * @param {Client} commandExecutor
	 * @param {string} command
	 */
	throwError(commandExecutor, command) {
		commandExecutor.sendMessage(Language.getKey("commands.unknown").replace("%s%", command));
	},
};
