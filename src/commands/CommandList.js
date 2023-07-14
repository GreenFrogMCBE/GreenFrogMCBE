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
const { players } = require("../api/player/PlayerInfo");

const { getKey } = require("../utils/Language");

/**
 * A command to list players currently on the server
 *
 * @type {import('../../declarations/Command').Command}
 */
module.exports = {
	data: {
		name: getKey("commands.list.name"),
		description: getKey("commands.list.description"),
		minArgs: 0,
		maxArgs: 0,
	},

	execute(_server, player) {
		const playerCount = players.length;
		const playerSet = new Set(players.map((p) => p.username));
		const playerList = [...playerSet].join(", ") || "";

		player.sendMessage(getKey("commands.list.execution.success.commands").replace("%s%", `${playerCount}/$.serverInfo.maxPlayers}`).replace("%d%", playerList));
	},
};
