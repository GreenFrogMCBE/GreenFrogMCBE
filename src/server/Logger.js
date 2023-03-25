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

module.exports = {
	/**
	 * Logs a message to the console as info
	 * @param {String} message - The message to log
	 */
	info(message) {
		const d = new Date();
		const dStr = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()}`;

		console.log(`${dStr} \x1b[32m${lang.logger.info}\x1b[0m | ${message}`);
	},

	/**
	 * Logs a message to the console as warning
	 * @param {String} message - The message to log
	 */
	warning(message) {
		const d = new Date();
		const dStr = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()}`;

		console.log(`${dStr} \x1b[33m${lang.logger.warning}\x1b[0m | ${message}`);
	},

	/**
	 * Logs a message to the console as error
	 * @param {String} message - The message to log
	 */
	error(message) {
		const d = new Date();
		const dStr = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()}`;

		console.log(`${dStr} \x1b[31m${lang.logger.error}\x1b[0m | ${message}`);
	},

	/**
	 * Logs a message to the console as error
	 * Requires for debug to be enabled in config
	 *
	 * @param {String} message - The message to log
	 */
	debug(message) {
		const d = new Date();
		const dStr = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()}`;

		if (!(process.env.DEBUG === "minecraft-protocol" || config.debug)) return;

		console.log(`${dStr} \x1b[35m${lang.logger.debug}\x1b[0m | ${message}`);
	},
};
