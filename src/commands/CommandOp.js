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
const Command = require("./Command")

const PermissionManager = require("../permission/PermissionManager")

const ArgumentType = require("./types/ArgumentType")

const { get_key } = require("../utils/Language")

/**
 * A command that makes the specified player opped
 */
class CommandOp extends Command {
	name = get_key("commands.op.name")
	description = get_key("commands.op.description")
	minArgs = 1
	maxArgs = 1
	requiresOp = true
	args = [
		{
			name: "player",
			type: ArgumentType.TARGET,
			optional: true
		}
	]

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {string[]} args
	 * @async
	 */
	async execute(player, server, args) {
		const playerName = args[0]

		try {
			await PermissionManager.op(playerName)

			player.send_message(get_key("commands.op.execution.success").replace("%s", playerName))
		} catch {
			player.send_message(get_key("commands.op.execution.failed").replace("%s", playerName))
		}
	}
}

module.exports = CommandOp
