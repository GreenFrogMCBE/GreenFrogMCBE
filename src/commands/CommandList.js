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
	minArgs = 0
	maxArgs = 0

	/**
	 * @param {import("Frog").Player} player
	 */
	execute(player) {
		const playerCount = players_online.length
		const playerSet = new Set(players_online.map((p) => p.username))
		const playerList = [...playerSet].join(", ") || ""

		player.send_message(get_key("commands.list.execution.success.commands").replace("%s", `${playerCount}/${Frog.config.serverInfo.maxPlayers}`).replace("%d", playerList))
	}
}

module.exports = CommandList
