/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const { convert_console_color } = require("./ConsoleColorConvertor")
const { getKey } = require("./Language")
const moment = require("moment")

const LoggingException = require("./exceptions/LoggingException")

module.exports = {
	/**
	 * This array contains all the logged messages
	 * @type {import("Frog").LogMessage[]}
	 */
	messages: [],

	/**
	 * Logs a message.
	 *
	 * @throws {LoggingException} If the `consoleLoggingLevel` is invalid
	 *
	 * @param {string} levelName The name of the logging level 
	 * @param {number} color The color ID for formatting
	 * @param {string} message The message
	 * @param {import("Frog").LogLevel} consoleLoggingLevel The logging level for the console output (e.g info, warn, error, debug)
	 */
	log(levelName, color, message, consoleLoggingLevel) {
		const Frog = require("../Frog")

		const date = moment().format(Frog.config.logger.dateFormat)

		if (!console[consoleLoggingLevel]) {
			throw new LoggingException(
				getKey("exceptions.logger.invalidType")
					.replace("%s", consoleLoggingLevel)
			)
		}

		let shouldLogMessage = true

		Frog.eventEmitter.emit("serverLogMessage", {
			consoleLoggingLevel,
			levelName,
			message,
			color,
			cancel: () => {
				shouldLogMessage = false
			},
		})

		if (!shouldLogMessage) return

		this.messages.push({
			consoleLoggingLevel,
			levelName,
			message,
			color,
		})

		console[consoleLoggingLevel](
			convert_console_color(
				Frog.config.logger.messageFormat
					.replace("%date%", date)
					.replace("%type%", `\x1b[${color}m${levelName}\x1b[0m`)
					.replace("%message%", message)
			)
		)
	},

	/**
	 * Logs a message to the console as info.
	 *
	 * @param {string} message- The log message.
	 */
	info(message) {
		this.log(getKey("logger.info"), 32, message, "info")
	},

	/**
	 * Logs a message to the console as a warning.
	 *
	 * @param {string} message- The log message.
	 */
	warning(message) {
		this.log(getKey("logger.warn"), 33, message, "warn")
	},

	/**
	 * Logs a message to the console as an error.
	 *
	 * @param {string} message- The log message.
	 */
	error(message) {
		this.log(getKey("logger.error"), 31, message, "error")
	},

	/**
	 * Logs a message to the console as debug.
	 * Requires debug to be enabled in the server settings.
	 *
	 * @param {string} message- The log message.
	 */
	debug(message) {
		const Frog = require("../Frog")

		if (!Frog.is_debug) return

		this.log(getKey("logger.debug"), 35, message, "info")
	},
}
