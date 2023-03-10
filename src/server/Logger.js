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

		text.replace(/§0/g, colors[0].method());
		text.replace(/§1/g, colors[1].method());
		text.replace(/§2/g, colors[2].method());
		text.replace(/§3/g, colors[3].method());
		text.replace(/§4/g, colors[4].method());
		text.replace(/§5/g, colors[5].method());
		text.replace(/§6/g, colors[6].method());
		text.replace(/§7/g, colors[7].method());
		text.replace(/§8/g, colors[8].method());
		text.replace(/§9/g, colors[9].method());
		text.replace(/§a/g, colors[10].method());
		text.replace(/§b/g, colors[11].method());
		text.replace(/§c/g, colors[12].method());
		text.replace(/§d/g, colors[13].method());
		text.replace(/§e/g, colors[14].method());
		text.replace(/§f/g, colors[15].method());
		text.replace(/§l/g, "\u00A7l");
		text.replace(/§m/g, "\u00A7m");
		text.replace(/§o/g, "\u00A7o");
		text.replace(/§r/g, "\u00A7r");

		return text;
	},
};
