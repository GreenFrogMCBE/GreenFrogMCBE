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

const Colors = require("../utils/types/Colors")

const { get_key } = require("../utils/Language")

const { version } = Frog.config.serverInfo

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
	minArgs = 0
	maxArgs = 0

	/**
	 * @param {import("Frog").Player} player
	 */
	async execute(player) {
		const message = get_key("server.version")
			.replace("%s", `${Frog.releaseData.minorServerVersion} (${Frog.releaseData.versionDescription})`)
			.replace("%d", version)

		player.send_message(`${Colors.GRAY}${message}`)
	}
}

module.exports = CommandVersion
