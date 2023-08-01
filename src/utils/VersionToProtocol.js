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
module.exports = {
	PROTOCOL_LIST: {
		"1.20.0": 589,
		"1.20": 589,
		"1.19.80": 582,
		"1.19.70": 575,
		"1.19.63": 568,
		"1.19.60": 567,
		"1.19.51": 559,
		"1.19.50": 559,
		"1.19.41": 557,
		"1.19.40": 557,
		"1.19.31": 554,
		"1.19.30": 554,
		"1.19.22": 545,
		"1.19.21": 545,
		"1.19.20": 544,
	},

	DEFAULT_PROTOCOL: 0,

	/**
	 * Returns the version as a protocol number
	 *
	 * @param {string} version
	 * @returns {number} The version as a protocol number
	 */
	getProtocol(version) {
		// Using switch is adding more lines of code than needed.

		return this.PROTOCOL_LIST[version] || this.DEFAULT_PROTOCOL;
	},
};
