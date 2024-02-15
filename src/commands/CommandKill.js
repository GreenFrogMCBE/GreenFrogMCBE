/**
 * ██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
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

const { Gamemode, Selector, ArgumentType } = require("@greenfrog/mc-enums")
const DamageCause = require("../player/types/DamageCause")

const PlayerInfo = require("../player/PlayerInfo")

const { get_player } = require("../player/PlayerInfo")

const { get_key } = require("../utils/Language")

/**
 * Returns if the player can be killed
 *
 * @param {import("Frog").Player} player
 * @returns {boolean}
 */
function can_be_killed(player) {
	if (
		player.permissions.is_console ||
		player.gamemode === Gamemode.Creative ||
		player.gamemode === Gamemode.Spectator
	) {
		return false
	}

	return true
}

/**
 * Attempts to kill the specified player.
 *
 * @param {import("Frog").Player} target - The player to be killed.
 */
const kill_player = (target) => {
	if (can_be_killed(target)) {
		return target.set_health(0, DamageCause.KillCommand)
	}

	target.send_message(get_key("commands.errors.targetError.targetsNotFound", [target.name]))
}

/**
 * Kills the specified player
 */
class CommandKill extends Command {
	name = get_key("commands.kill.name")
	description = get_key("commands.kill.description")
	min_args = 0
	requires_op = true
	args = [
		{
			name: "target",
			type: ArgumentType.Target,
			optional: true
		}
	]

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {string[]} args
	 */
	execute(player, server, args) {
		switch (args[0]) {
			case Selector.Self:
			case undefined:
				return can_be_killed(player) && player.set_health(0, DamageCause.KillCommand)
			case Selector.AllEntities:
			case Selector.AllPlayers:
				return PlayerInfo.players_online.forEach(kill_player)
			case Selector.RandomPlayer:
				const random_player = Math.floor(Math.random() * PlayerInfo.players_online.length)

				return kill_player(PlayerInfo.players_online[random_player])
			default:
				try {
					const subject = get_player(args[0])

					subject && kill_player(subject)
				} catch {
					player.send_message(get_key("commands.kill.execution.failed.notOnline").replace("%s", args[0]))
				}
				break
		}
	}
}

module.exports = CommandKill
