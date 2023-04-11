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

/* const Frog = require("../Frog") <--- This code does not work
It throws:
(node:13208) Warning: Accessing non-existent property 'serverConfigurationFiles' of module exports inside circular dependency  */

const LoggingException = require("../utils/exceptions/LoggingException");

let lang;

function fireEvent(langString, color, message, consoleType) {
	require("../Frog").eventEmitter.emit('serverLogMessage', {
		type: langString,
		message,
		server: require("../Frog"),
		legacy: {
			color,
			consoleType,
		},
		cancel() {
			return false; // You can't do that here...
		}
	})
}

module.exports = {
	/**
	 * Setups logger
	 */
	setupLogger() {
		lang = require("../Frog").serverConfigurationFiles.lang;
	},

	/**
	 * Returns if debug is enabled or not
	 * 
	 * @returns {Boolean}
	 */
	isDebugEnabled: require("../Frog").isDebug,

	/**
	 * Logs a message
	 * 
	 * @throws {LoggingException} - If the log type is invalid (valid are info, warn, error, debug)
	 * @throws {LoggingException} - If the log type is 'warning' (common Node.JS mistake) (must be 'warn')
	 * 
	 * @param {String} langString 
	 * @param {Number} color 
	 * @param {String} message 
	 * @param {String} consoleType
	 */
	log(langString, color, message, consoleType) {
		const date = new Date().toLocaleString().replace(",", "").toUpperCase();

		if (consoleType === "warning") {
			throw new LoggingException("Bad log type: warning. Its 'warn', not 'warning'")
		}

		if (!console[consoleType]) {
			throw new LoggingException("Bad log type: " + console[consoleType] + ". Valid types are info, warn, error, debug")
		}

		fireEvent(langString, color, message, consoleType)
		console[consoleType](convertConsoleColor(`${date} \x1b[${color}m${lang.logger[langString]}\x1b[0m | ${message}`))
	},

	/**
	 * Logs a message to the console as info
	 * 
	 * @param {String} message
	 */
	info(message) {
		this.log('info', '32', message, 'info');
	},

	/**
	 * Logs a message to the console as warning
	 * 
	 * @param {String} message
	 */
	warning(message) {
		this.log('warning', '33', message, 'warn')
	},

	/**
	 * Logs a message to the console as error
	 * @param {String} message
	 */
	error(message) {
		this.log('error', '31', message, 'error')
	},

	/**
	 * Logs a message to the console as debug
	 * Requires for debug to be enabled in config
	 *
	 * @param {String} message
	 */
	debug(message) {
		if (!(process.env.DEBUG === "minecraft-protocol" || this.isDebugEnabled)) return;

		this.log('debug', '35', message, 'info')
	},
};
