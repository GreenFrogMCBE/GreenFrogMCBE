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
module.exports = {
	/**
	 * Returns the version as a protocol number
	 *
	 * @param {string} version
	 * @returns {number} The version as a protocol number
	 */
	getProtocol(version) {
		switch (version) {
			case "1.19.70":
				return 575;
			case "1.19.63":
				return 568;
			case "1.19.60":
				return 567;
			case "1.19.51":
			case "1.19.50":
				return 559;
			case "1.19.41":
			case "1.19.40":
				return 557;
			case "1.19.31":
			case "1.19.30":
				return 554;
			case "1.19.22":
			case "1.19.21":
				return 545;
			case "1.19.20":
				return 544;
			default:
				return 999;
		}
	},
};
