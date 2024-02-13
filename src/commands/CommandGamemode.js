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

const { get_key } = require("../utils/Language")

const Gamemode = require("../player/types/Gamemode")
const ArgumentType = require("./types/ArgumentType")

/**
 * A command to change the player's game mode.
 */
class CommandGamemode extends Command {
	name = get_key("commands.gamemode.name")
	description = get_key("commands.gamemode.description")
	maxArg = 1
	minArg = 1
	requiresOp = true
	args = [
		{
			name: "player",
			type: ArgumentType.TARGET,
			optional: false,
		},
		{
			name: "mode",
			type: ArgumentType.STRING,
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
			player.send_message(get_key("commands.errors.internalError.badSender"))
			return
		}

		const gamemodeMap = {
			0: Gamemode.SURVIVAL,
			1: Gamemode.CREATIVE,
			2: Gamemode.ADVENTURE,
			3: Gamemode.SPECTATOR,
			5: Gamemode.FALLBACK,

			s: Gamemode.SURVIVAL,
			c: Gamemode.CREATIVE,
			a: Gamemode.ADVENTURE,
			sp: Gamemode.SPECTATOR,
			d: Gamemode.FALLBACK,

			survival: Gamemode.SURVIVAL,
			creative: Gamemode.CREATIVE,
			adventure: Gamemode.ADVENTURE,
			spectator: Gamemode.SPECTATOR,
			default: Gamemode.FALLBACK,
		}

		const gamemode = gamemodeMap[args[0]]

		if (!gamemode) {
			player.send_message(get_key("commands.gamemode.execution.failed").replace("%s", args[0]))

			return
		}

		player.setGamemode(gamemode)

		const gmStr = gamemode.charAt(0).toUpperCase() + gamemode.slice(1)

		player.send_message(get_key("commands.gamemode.execution.success.updated").replace("%s", gmStr))
		player.send_message(get_key("commands.gamemode.execution.success.set").replace("%s", gmStr))
	}
}

module.exports = CommandGamemode
