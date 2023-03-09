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
const LogTypes = require("./LogTypes");
const { lang, config } = require("./ServerInfo");

module.exports = {
	/**
	 * It logs a message to the console with a timestamp and a color
	 * @param message - The message to log
	 * @param [type=info] - The type.
	 */
	log(message, type = LogTypes.INFO) {
		const d = new Date();
		const dStr = d.toLocaleString().replace(",", "").toUpperCase();

		const logLevel = {
			info: 32,
			warning: 33,
			warn: 33,
			error: 31,
			err: 31,
			debug: 35,
		};

		const logColor = logLevel[type] || 0;
		if (!logColor) throw new Error(lang.invalidLogType);

		if (type === "debug" && !(process.env.DEBUG === "minecraft-protocol" || config.debug)) return;

		console.log(`[${dStr} \x1b[${logColor}m${lang.logger[type]}\x1b[0m] ${this.colorize(message)}`);
	},

	/**
	 * @private
	 * @param {string} text
	 */
	colorize(text) {
		const colors = [
			{ mc: "§0", method: (t) => `\x1b[30m${t}` },
			{ mc: "§1", method: (t) => `\x1b[34m${t}` },
			{ mc: "§2", method: (t) => `\x1b[32m${t}` },
			{ mc: "§3", method: (t) => `\x1b[36m${t}` },
			{ mc: "§4", method: (t) => `\x1b[31m${t}` },
			{ mc: "§5", method: (t) => `\x1b[35m${t}` },
			{ mc: "§6", method: (t) => `\x1b[33m${t}` },
			{ mc: "§7", method: (t) => `\x1b[37m${t}` },
			{ mc: "§8", method: (t) => `\x1b[90m${t}` },
			{ mc: "§9", method: (t) => `\x1b[94m${t}` },
			{ mc: "§a", method: (t) => `\x1b[92m${t}` },
			{ mc: "§b", method: (t) => `\x1b[96m${t}` },
			{ mc: "§c", method: (t) => `\x1b[91m${t}` },
			{ mc: "§d", method: (t) => `\x1b[95m${t}` },
			{ mc: "§e", method: (t) => `\x1b[93m${t}` },
			{ mc: "§f", method: (t) => `\x1b[97m${t}` },
		];

		const ar = text.split(" ");

		ar.forEach((text, index) => {
			colors.forEach((c) => {
				if (text.startsWith(c.mc)) ar[index] = c.method(text.substring(2));
			});
		});

		return `${ar.join(" ")}\x1b[0m`;
	},
};
