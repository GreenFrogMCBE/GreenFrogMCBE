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

const { getKey } = require("../utils/Language");

/**
 * A command that makes the specified player opped
 */
class CommandOp extends Command {
	name = getKey("commands.op.name");
	description = getKey("commands.op.description");
	minArgs = 1;
	maxArgs = 1;
	requiresOp = true;
	/** @type {{ name: string; type: 'int' | 'float' | 'value' | 'wildcard_int' | 'operator' | 'command_operator' | 'target' | 'wildcard_target' | 'file_path' | 'integer_range' | 'equipment_slot' | 'string' | 'block_position' | 'position' | 'message' | 'raw_text' | 'json' | 'block_states' | 'command'; optional: boolean; }[]} */
	args = [
		{
			name: "player",
			type: "target",
			optional: true
		}
	];

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {string[]} args
	 */
	async execute(player, server, args) {
		const playerName = args[0];

		try {
			PermissionManager.setOpStatus(playerName, true);

			player.sendMessage(getKey("commands.op.execution.success").replace("%s", playerName));
		} catch {
			player.sendMessage(getKey("commands.op.execution.failed").replace("%s", playerName));
		}
	}
}

module.exports = CommandOp;
