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

const { ArgumentType } = require("@greenfrog/mc-enums")

const { players_online } = require("../player/PlayerInfo")

const { get_key } = require("../utils/Language")

/**
 * A command that changes the time
 */
class CommandTime extends Command {
	name = get_key("commands.time.name")
	description = get_key("commands.time.description")
	min_args = 1
	max_args = 1
	requires_op = true
	args = [
		{
			name: "time",
			type: ArgumentType.Int,
			optional: false,
		}
	]

	/**
	 * @param {import("Frog").Player} player
	 * @param {string[]} args
	 */
	async execute(player, args) {
		const time_arg = args[0]

		let time = 0

		switch (time_arg) {
			case get_key("commands.time.times.day"):
				time = 1000
				break
			case get_key("commands.time.times.night"):
				time = 17000
				break
			default:
				time = parseInt(time_arg, 10)

				if (isNaN(time)) {
					return player.send_message(get_key("commands.time.execution.failed"))
				}
		}

		for (const online_player of players_online) {
			online_player.world.time = time

			online_player.time(time)
		}

		player.send_message(get_key("commands.time.execution.success", [time_arg]))
	}
}

module.exports = CommandTime
