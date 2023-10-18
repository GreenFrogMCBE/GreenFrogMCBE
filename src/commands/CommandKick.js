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
const Command = require("./Command");

const { getKey } = require("../utils/Language");

const PlayerInfo = require("../player/PlayerInfo");

/**
 * A command to disconnect a player from the server
 */
class CommandKick extends Command {
	name = getKey("commands.kick.name");
	description = getKey("commands.kick.description");
	minArgs = 1;
	requiresOp = true;
	args = [
		{
			name: "player",
			type: "target",
			optional: false,
		}
	];

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {string[]} args
	 */
	execute(player, server, args) {
		const playerName = args[0];
		const reason = args.slice(1).join(" ");

		const target = PlayerInfo.getPlayer(playerName);

		if (!target) {
			player.sendMessage(getKey("commands.kick.execution.failed.notOnline").replace("%s", playerName));
			return;
		}

		target.kick(getKey("kickMessages.wereKicked").replace("%s", reason));
	}
}

module.exports = CommandKick;
