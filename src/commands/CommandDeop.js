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

const { ArgumentType } = require("@greenfrog/mc-enums")

const { get_key } = require("../utils/Language")

/**
 * A command that removes the op of the player
 */
class CommandDeop extends Command {
	name = get_key("commands.deop.name")
	description = get_key("commands.deop.description")
	min_args = 1
	requires_op = true
	args = [
		{
			name: "player",
			type: ArgumentType.Target,
			optional: false
		}
	]

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {string[]} args
	 * @async
	 */
	async execute(player, server, args) {
		const player_name = args[0]

		try {
			await PermissionManager.deop(player_name)

			player.send_message(get_key("commands.deop.execution.success", [player_name]))
		} catch {
			player.send_message(get_key("commands.deop.execution.fail", [player_name]))
		}
	}
}

module.exports = CommandDeop
