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
const Frog = require("../../Frog")

const Logger = require("../../utils/Logger")

module.exports = {
	/**
	 * Logs a query packet to the console.
	 * Will only work if `Frog.config.query.log.packets` is enabled
	 *
	 * @param {string} packet
	 * @param {boolean} [warning] Log the packet with a warning log level?
	 */
	logPacket(packet, warning = true) {
		if (Frog.config.query.log.packets || Frog.is_debug) {
			if (warning) {
				Logger.warning(packet)
			} else {
				Logger.info(packet)
			}
		}
	},

	/**
	 * Logs a query connection to the console.
	 * Will only work if `Frog.config.query.log.connections` is enabled
	 *
	 * @param {string} packet
	 */
	logConnection(packet) {
		if (Frog.config.query.log.connections || Frog.is_debug) {
			Logger.info(packet)
		}
	},
}
