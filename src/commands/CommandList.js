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
const Frog = require("../Frog");

const { playersOnline } = require("../player/PlayerInfo");

const { getKey } = require("../utils/Language");

const Command = require("./Command");

/**
 * A command that lists all online players
 */
class CommandList extends Command {
	name = getKey("commands.list.name");
	description = getKey("commands.list.description");
	minArgs = 0;
	maxArgs = 0;

	/**
	 * @param {import("Frog").Player} player
	 */
	execute(player) {
		const playerCount = playersOnline.length;
		const playerSet = new Set(playersOnline.map((p) => p.username));
		const playerList = [...playerSet].join(", ") || "";

		player.sendMessage(
			getKey("commands.list.execution.success.commands")
				.replace("%s", `${playerCount}/${Frog.config.serverInfo.maxPlayers}`)
				.replace("%d", playerList)
		);
	}
}

module.exports = CommandList;
