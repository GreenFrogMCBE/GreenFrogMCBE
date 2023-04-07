const Frog = require("../Frog");

/**
 * Capitalizes the first letter of a string
 * 
 * 
 * @private
 * @param {String} str 
 * @returns {String}
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
        commandExecutor.sendMessage(Frog.serverConfigurationFiles.lang.errors.unknownCommandOrNoPermission.replace('%commandname%', data.name));
    },

    /**
     * Checks if the command is enabled or not.
     *
     * @param {Client} player - The player who is executing the command.
     * @param {JSON} data - The command data.
     * @returns {boolean} - Returns true if the command is disabled, false otherwise.
     */
    checkCommand(player, data) {
        if (player.isConsole) {
            // Console commands
            if (!Frog.serverConfigurationFiles.config[`consoleCommand${capitalizeFirstLetter(data.name)}`]) {
                this.throwError(player, data);
                return true;
            }
        } else {
            // Player commands
            if (!Frog.serverConfigurationFiles.config[`playerCommand${capitalizeFirstLetter(data.name)}`]) {
                this.throwError(player, data);
                return true;
            }
        }

        return false;
    }

}