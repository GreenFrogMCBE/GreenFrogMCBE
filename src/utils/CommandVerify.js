const { config, lang } = require("../api/ServerInfo");

/**
 * Throws an unknown command error.
 * 
 * @private
 * @param {Client} player
 * @param {JSON} data 
 */
function throwError(player, data) {
    player.sendMessage(lang.errors.unknownCommandOrNoPermission.replace('%commandname%', data.name));
}

/**
 * Capitalizes the first letter
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
     * Checks if the command is enabled or not
     * @param {Client} player
     * @param {JSON} data 
     */
    checkCommand(player, data) {
        if (player.isConsole) {
            // Console commands
            if (!config['consoleCommand' + capitalizeFirstLetter(data.name)]) {
                throwError(player, data);
                return true
            }
        } else {
            // Player commands
            if (!config['playerCommand' + capitalizeFirstLetter(data.name)]) {
                throwError(player, data);
                return true
            }
        }

        return false
    }
}