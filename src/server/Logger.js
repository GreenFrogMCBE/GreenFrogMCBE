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
const { lang, config } = require("../api/ServerInfo");
const { convertConsoleColor } = require("../utils/ConsoleColorConvertor");


module.exports = {
	/**
	 * Logs a message with custom message
	 * 
	 * @param {String} langString 
	 * @param {Number} color 
	 * @param {String} message 
	 * @param {String} consoleType
	 */
	customLog(langString, color, message, consoleType) {
		const d = new Date();
		const dStr = d.toLocaleString().replace(",", "").toUpperCase();

		console[consoleType](convertConsoleColor(`${dStr} \x1b[${color}m${lang.logger[langString]}\x1b[0m | ${message}`))
	},

	/**
	 * Logs a message to the console as info
	 * @param {String} message - The message to log
	 */
	info(message) {
		this.customLog('info', '32', message, 'info');
	},

	/**
	 * Logs a message to the console as warning
	 * @param {String} message - The message to log
	 */
	warning(message) {
		this.customLog('warning', '33', message, 'warning')
	},

	/**
	 * Logs a message to the console as error
	 * @param {String} message - The message to log
	 */
	error(message) {
		this.customLog('error', '31', message, 'error')
	},

	/**
	 * Logs a message to the console as debug
	 * Requires for debug to be enabled in config
	 *
	 * @param {String} message - The message to log
	 */
	debug(message) {
		if (!(process.env.DEBUG === "minecraft-protocol" || config.debug)) return;

		this.customLog('debug', '35', message, 'info')
	},
};
