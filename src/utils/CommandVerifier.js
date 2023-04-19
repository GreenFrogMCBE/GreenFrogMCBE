const Frog = require("../Frog");

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
     * @param {JSON} data 
     */
    throwError(commandExecutor, data) {
        commandExecutor.sendMessage(Language.getKey("commands.unknown").replace('%s%', data.name));
    },

    /**
     * Checks if the command is enabled or not.
     *
     * @param {Client} player - The player who is executing the command.
     * @param {JSON} data - The command data.
     * @param {boolean} oprequired - If OP is required to execute this command
     * @returns {boolean} - Returns true if the command is disabled, false otherwise.
     */
    checkCommand(player, data, oprequired) {
        if (!(player.isConsole || player.op) && oprequired) {
            this.throwError(player, data);

            return true
        }

        if (player.isConsole) {
            if (!Frog.serverConfigurationFiles.config.chat.commands[`consoleCommand${capitalizeFirstLetter(data.name)}`]) {
                this.throwError(player, data);

                return true;
            }
        } else {
            if (!Frog.serverConfigurationFiles.config.chat.commands[`playerCommand${capitalizeFirstLetter(data.name)}`]) {
                this.throwError(player, data);

                return true;
            }
        }

        return false;
    }
}