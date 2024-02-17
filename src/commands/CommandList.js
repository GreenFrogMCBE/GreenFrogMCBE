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
const Frog = require("../Frog")

const { players_online } = require("../player/PlayerInfo")

const { get_key } = require("../utils/Language")

const Command = require("./Command")

/**
 * A command that lists all online players
 */
class CommandList extends Command {
	name = get_key("commands.list.name")
	description = get_key("commands.list.description")
	min_args = 0
	max_args = 0

	execute(player) {
		const player_count = players_online.length
		const player_set = new Set(players_online.map((p) => p.username))
		const player_list = [...player_set].join(", ") || ""

		player.send_message(
			get_key("commands.list.execution.success.commands",
				[
					`${player_count}/${Frog.config.server_info.max_players}`,
					player_list
				]
			)
		)
	}
}

module.exports = CommandList
