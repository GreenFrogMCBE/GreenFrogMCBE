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

const PermissionManager = require("../permission/PermissionManager");

const ArgumentType = require("./types/ArgumentType");

const { getKey } = require("../utils/Language");

/**
 * A command that removes the op of the player
 */
class CommandDeop extends Command {
	name = getKey("commands.deop.name");
	description = getKey("commands.deop.description");
	minArgs = 1;
	requiresOp = true;
	args = [
		{
			name: "player",
			type: ArgumentType.TARGET,
			optional: false
		}
	];

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {string[]} args
	 * @async
	 */
	async execute(player, server, args) {
		const playerName = args[0];

		try {
			await PermissionManager.deop(playerName);

			player.sendMessage(getKey("commands.deop.execution.success").replace("%s", playerName));
		} catch {
			player.sendMessage(getKey("commands.deop.execution.fail").replace("%s", playerName));
		}
	}
}

module.exports = CommandDeop;
