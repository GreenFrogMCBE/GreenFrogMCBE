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

const Frog = require("../Frog");

/**
 * A command to send a message in the chat to other players
 */
class CommandSay extends Command {
	name = getKey("commands.say.name");
	description = getKey("commands.say.description");
	minArgs = 1;
	requiresOp = true;
	/** @type {{ name: string; type: 'int' | 'float' | 'value' | 'wildcard_int' | 'operator' | 'command_operator' | 'target' | 'wildcard_target' | 'file_path' | 'integer_range' | 'equipment_slot' | 'string' | 'block_position' | 'position' | 'message' | 'raw_text' | 'json' | 'block_states' | 'command'; optional: boolean; }[]} */
	args = [
		{
			name: "message",
			type: "string",
			optional: false
		}
	];

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {string[]} args
	 */
	async execute(player, server, args) {
		const message = getKey("chat.format.say").replace("%s", player.username).replace("%d", args.join(" "));

		Frog.broadcastMessage(message);
	}
}

module.exports = CommandSay;
