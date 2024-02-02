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

const { players_online } = require("../player/PlayerInfo")

const { get_key } = require("../utils/Language")

const ArgumentType = require("./types/ArgumentType")

/**
 * A command that changes the time
 */
class CommandTime extends Command {
	name = get_key("commands.time.name")
	description = get_key("commands.time.description")
	minArgs = 1
	maxArgs = 1
	requiresOp = true
	args = [
		{
			name: "time",
			type: ArgumentType.INT,
			optional: false,
		}
	]

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {string[]} args
	 */
	async execute(player, server, args) {
		const time = args[0]

		const setTime = time === get_key("commands.time.times.day") ? 1000 : time === get_key("commands.time.times.night") ? 17000 : parseInt(time, 10)

		if (isNaN(Number(setTime))) {
			player.send_message(get_key("commands.time.execution.failed"))
			return
		}

		const parsedTime = parseInt(time)

		for (const player of players_online) {
			player.world.time = parsedTime
			player.setTime(parsedTime)
		}

		player.send_message(get_key("commands.time.execution.success").replace("%s", time))
	}
}

module.exports = CommandTime
