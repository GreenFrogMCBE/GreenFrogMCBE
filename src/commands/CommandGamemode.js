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
const { getKey } = require("../utils/Language");

/**
 * Command to change the player's game mode.
 *
 * @type {import('../type/Command').Command}
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
			player.sendMessage(getKey("commands.internalError.badSender"));
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
