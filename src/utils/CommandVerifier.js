/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
const Language = require("./Language");

/**
 * Capitalizes the first letter of a string
 *
 * @private
 * @param {string} str
 * @returns {string}
 */
function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

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

	/**
	 * Checks if the command is enabled or not.
	 *
	 * @param {Client} player - The player who is executing the command.
	 * @param {JSON} command - The command data.
	 * @param {boolean} oprequired - If OP is required to execute this command
	 * @returns {boolean} - Returns true if the command is disabled, false otherwise.
	 */
	isDisabled(player, command, oprequired) {
		if (!(player.isConsole || player.op) && oprequired) {
			this.throwError(player, command);

			return true;
		}

		if (player.isConsole) {
			if (!require("../Frog").serverConfigurationFiles.config.chat.commands[`consoleCommand${capitalizeFirstLetter(oprequired)}`]) {
				this.throwError(player, command);

				return true;
			}
		} else {
			if (!require("../Frog").serverConfigurationFiles.config.chat.commands[`playerCommand${capitalizeFirstLetter(oprequired)}`]) {
				this.throwError(player, command);

				return true;
			}
		}

		return false;
	},
};
