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
const { get_key } = require("./Language")
const moment = require("moment")

const LoggingException = require("./exceptions/LoggingException")

module.exports = {
	/**
	 * @type {import("Frog").LogMessage[]}
	 */
	messages: [],

	/**
	 * Logs a message.
	 *
	 * @throws {LoggingException} If the `console_logging_level` is invalid
	 *
	 * @param {string} level_name The name of the logging level
	 * @param {number} color The color ID for formatting
	 * @param {string} message The message
	 * @param {import("Frog").LogLevel} console_logging_level The logging level for the console output (e.g info, warn, error, debug)
	 */
	log(level_name, color, message, console_logging_level) {
		const Frog = require("../Frog")

		const date = moment()
			.format(Frog.config.logger.dateFormat)

		if (!["log", "info", "warn", "error"].includes(console_logging_level)) {
			throw new LoggingException(
				get_key("exceptions.logger.invalidType", [console_logging_level])
			)
		}

		this.messages.push({
			console_logging_level,
			level_name,
			message,
			color,
		})

		console[console_logging_level](
			convert_console_color(
				Frog.config.logger.message_format
					.replace("%date%", date)
					.replace("%type%", `\x1b[${color}m${level_name}\x1b[0m`)
					.replace("%message%", message)
			)
		)
	},

	/**
	 * Logs a message to the console as info.
	 *
	 * @param {string} message - The log message.
	 */
	info(message) {
		this.log(get_key("logger.info"), 32, message, "info")
	},

	/**
	 * Logs a message to the console as a warning.
	 *
	 * @param {string} message - The log message.
	 */
	warning(message) {
		this.log(get_key("logger.warn"), 33, message, "warn")
	},

	/**
	 * Logs a message to the console as an error.
	 *
	 * @param {string} message - The log message.
	 */
	error(message) {
		this.log(get_key("logger.error"), 31, message, "error")
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

		this.log(get_key("logger.debug"), 35, message, "info")
	},
}
