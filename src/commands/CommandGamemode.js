/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░��█║██║░░╚██╗
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

const { get_key } = require("../utils/Language")

const { Gamemode, ArgumentType, GAMEMODE_MAP} = require("@greenfrog/mc-enums")

/**
 * A command to change the player's game mode.
 */
class CommandGamemode extends Command {
	name = get_key("commands.gamemode.name")
	description = get_key("commands.gamemode.description")
	max_arg = 1
	min_arg = 1
	requires_op = true
	args = [
		{
			name: "player",
			type: ArgumentType.Target,
			optional: false,
		},
		{
			name: "mode",
			type: ArgumentType.Target,
			optional: false
		}
	]

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {string[]} args
	 */
	execute(player, server, args) {
		if (player.permissions.is_console) {
			return player.send_message(get_key("commands.errors.internalError.badSender"))
		}

		const gamemode_arg = args[0]

		const gamemode = GAMEMODE_MAP[gamemode_arg]

		if (!gamemode) {
			return player.send_message(get_key("commands.gamemode.execution.failed", [gamemode_arg]))
		}

		player.set_gamemode(gamemode)

		const gamemode_string = gamemode.charAt(0).toUpperCase() + gamemode.slice(1)

		player.send_message(get_key("commands.gamemode.execution.success.updated", [gamemode_string]))
		player.send_message(get_key("commands.gamemode.execution.success.set", [gamemode_string]))
	}
}

module.exports = CommandGamemode
