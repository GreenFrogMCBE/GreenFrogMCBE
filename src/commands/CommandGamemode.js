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
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const { getKey } = require("../utils/Language");

/**
 * A command to change the player's game mode.
 *
 * @type {import('../../types/interfaces/Command').Command}
 */
module.exports = {
	data: {
		name: getKey("commands.gamemode.name"),
		description: getKey("commands.gamemode.description"),
		maxArg: 1,
		minArgs: 1,
		requiresOp: true,
	},

	execute(_server, player, args) {
		if (player.isConsole) {
			player.sendMessage(getKey("commands.errors.internalError.badSender"));
			return;
		}

		const gamemodeMap = {
			0: "survival",
			1: "creative",
			2: "adventure",
			3: "spectator",
			4: "fallback",

			s: "survival",
			c: "creative",
			a: "adventure",
			sp: "spectator",
			d: "fallback",

			survival: "survival",
			creative: "creative",
			adventure: "adventure",
			spectator: "spectator",
			default: "fallback",
		};

		const gamemode = gamemodeMap[args[0]];

		if (!gamemode) {
			player.sendMessage(getKey("commands.gamemode.execution.failed").replace("%s%", args[0]));
			return;
		}

		try {
			player.setGamemode(gamemode);

			const gmStr = gamemode.charAt(0).toUpperCase() + gamemode.slice(1);

			player.sendMessage(getKey("commands.gamemode.execution.success.updated").replace("%s%", gmStr));
			player.sendMessage(getKey("commands.gamemode.execution.success.set").replace("%s%", gmStr));
		} catch {
			player.sendMessage(getKey("commands.gamemode.execution.invalidGamemode"));
		}
	},
};
