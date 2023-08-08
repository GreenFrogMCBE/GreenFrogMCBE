/**
 * ██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
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
const { convertConsoleColor } = require("./ConsoleColorConvertor");
const { getKey } = require("./Language");

const LoggingException = require("./exceptions/LoggingException");

module.exports = {
	/** @type {import("Frog").LogMessage[]} */
	messages: [],

	/**
	 * Logs a message
	 *
	 * @throws {LoggingException} - If the log types is invalid (valid types are info, warn, error, debug)
	 *
	 * @param {string} langString
	 * @param {number} color
	 * @param {string} message
	 * @param {string} type
	 */
	log(langString, color, message, type) {
		const Frog = require("../Frog");

		const date = new Date().toLocaleString().replace(",", "").toUpperCase();

		if (!console[type]) {
			throw new LoggingException(getKey("exceptions.logger.invalidType").replace("%s", type));
		}

		let shouldLogMessage = true;

		Frog.eventEmitter.emit("serverLogMessage", {
			type,
			langString,
			message,
			color,
			cancel: () => {
				shouldLogMessage = false;
			},
		});

		if (!shouldLogMessage) return;

		this.messages.push({
			langString,
			color,
			message,
			type,
		});

		console[type](convertConsoleColor(`${date} \x1b[${color}m${langString}\x1b[0m | ${message}`));
	},

	/**
	 * Logs a message to the console as info
	 *
	 * @param {string} message
	 */
	info(message) {
		this.log(getKey("logger.info"), 32, message, "info");
	},

	/**
	 * Logs a message to the console as a warning
	 *
	 * @param {string} message
	 */
	warning(message) {
		this.log(getKey("logger.warn"), 33, message, "warn");
	},

	/**
	 * Logs a message to the console as an error
	 *
	 * @param {string} message
	 */
	error(message) {
		this.log(getKey("logger.error"), 31, message, "error");
	},

	/**
	 * Logs a message to the console as debug
	 * Requires debug to be enabled in the server settings
	 *
	 * @param {string} message
	 */
	debug(message) {
		const Frog = require("../Frog");

		if (!Frog.isDebug) return;

		this.log(getKey("logger.debug"), 35, message, "info");
	},
};
