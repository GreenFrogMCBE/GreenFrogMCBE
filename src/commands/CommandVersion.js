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

const Frog = require("../Frog")

const { ChatColors } = require("@greenfrog/mc-enums")

const { get_key } = require("../utils/Language")

const { version } = Frog.config.server_info

/**
 * A command that shows the server's version
 */
class CommandVersion extends Command {
	name = get_key("commands.version.name")
	description = get_key("commands.version.description")
	aliases = [
		get_key("commands.version.aliases.ver"),
		get_key("commands.version.aliases.about")
	]
	min_args = 0
	max_args = 0

	/**
	 * @param {import("Frog").Player} player
	 */
	async execute(player) {
		const message = get_key("server.version",
			[
				`${Frog.release_data.minor_server_version} (${Frog.release_data.version_description})`,
				version
			]
		)

		player.send_message(`${ChatColors.Gray}${message}`)
	}
}

module.exports = CommandVersion
