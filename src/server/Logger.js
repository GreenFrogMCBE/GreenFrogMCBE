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

const { convertConsoleColor } = require("../utils/ConsoleColorConvertor");
const { getKey } = require("../utils/Language");

/* const Frog = require("../Frog") <--- This code does not work
It throws:
(node:13208) Warning: Accessing non-existent property 'serverConfigurationFiles' of module exports inside circular dependency  */

const LoggingException = require("../utils/exceptions/LoggingException");

function fireEvent(langString, color, message, consoleType) {
	require("../Frog").eventEmitter.emit('serverLogMessage', {
		type: langString,
		message,
		server: require("../Frog"),
		legacy: {
			color,
			consoleType,
		}
	})
}

module.exports = {
	/**
	 * Returns if debug is enabled or not
	 * 
	 * @returns {boolean}
	 */
	isDebugEnabled() { require("../Frog").isDebug },

	/**
	 * Logs a message
	 * 
	 * @throws {LoggingException} - If the log type is invalid (valid are info, warn, error, debug)
	 * @throws {LoggingException} - If the log type is 'warning' (common Node.JS mistake) (must be 'warn')
	 * 
	 * @param {string} langString 
	 * @param {number} color 
	 * @param {string} message 
	 * @param {string} consoleType
	 * 
	 * @function
	 */
	log(langString, color, message, consoleType) {
		const date = new Date().toLocaleString().replace(",", "").toUpperCase();

		if (consoleType === "warning") {
			throw new LoggingException(getKey("exceptions.logger.invalidWarning"))
		}

		if (!console[consoleType]) {
			throw new LoggingException(getKey("exceptions.logger.invalidType").replace("%s%", consoleType))
		}

		fireEvent(langString, color, message, consoleType)
		console[consoleType](convertConsoleColor(`${date} \x1b[${color}m${langString}\x1b[0m | ${message}`))
	},

	/**
	 * Logs a message to the console as info
	 * 
	 * @param {string} message
	 */
	info(message) {
		this.log(getKey('logger.info'), '32', message, 'info');
	},

	/**
	 * Logs a message to the console as warning
	 * 
	 * @param {string} message
	 * @function
	 */
	warning(message) {
		this.log(getKey('logger.warn'), '33', message, 'warn')
	},

	/**
	 * Logs a message to the console as error
	 * 
	 * @param {string} message
	 * @function
	 */
	error(message) {
		this.log(getKey('logger.error'), '31', message, 'error')
	},

	/**
	 * Logs a message to the console as debug
	 * Requires for debug to be enabled in the server settings
	 *
	 * @param {string} message
	 * @function
	 */
	debug(message) {
		if (!(process.env.DEBUG === "minecraft-protocol" || this.isDebugEnabled())) return;

		this.log(getKey('logger.debug'), '35', message, 'info')
	},
};
