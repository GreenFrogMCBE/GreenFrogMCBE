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
const Frog = require("../Frog");

const { players } = require("../api/player/PlayerInfo");

const { getKey } = require("../utils/Language");

const { serverConfigurationFiles } = Frog;
const { config } = serverConfigurationFiles;

/**
 * Command to list players currently on the server.
 *
 * @type {import('../type/Command').Command}
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

		player.sendMessage(getKey("commands.list.execution.success.commandList").replace("%s%", `${playerCount}/${config.serverInfo.maxPlayers}`).replace("%d%", playerList));
	},
};
