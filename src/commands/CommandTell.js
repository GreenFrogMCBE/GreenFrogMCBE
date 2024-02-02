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

const { getPlayer } = require("../player/PlayerInfo")

const { get_key } = require("../utils/Language")

const ArgumentType = require("./types/ArgumentType")

/**
 * A command that sends a private message to other players
 */
class CommandTell extends Command {
	name = get_key("commands.tell.name")
	description = get_key("commands.tell.description")
	aliases = [
		get_key("commands.tell.aliases.w"), 
		get_key("commands.tell.aliases.whisper"), 
		get_key("commands.tell.aliases.msg")
	]
	minArgs = 2
	args = [
		{
			name: "player",
			type: ArgumentType.TARGET,
			optional: false,
		},
		{
			name: "message",
			type: ArgumentType.STRING,
			optional: false
		}
	]

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {string[]} args
	 */
	async execute(player, server, args) {
		const target = getPlayer(args[0])

		if (!target) {
			player.send_message(get_key("commands.errors.targetError.targetsNotFound"))
			return
		}

		const message = args.slice(1).join(" ")

		target.send_message(get_key("commands.tell.execution.success").replace("%s", player.username).replace("%d", player.username).replace("%f", message))

		player.send_message(get_key("commands.tell.execution.success.whisper").replace("%s", target.username).replace("%d", message))
	}
}

module.exports = CommandTell
