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

const PluginManager = require("../plugins/PluginManager")

const Colors = require("../utils/types/Colors")

const { get_key } = require("../utils/Language")

/**
 * A command that all the plugin this server uses
 */
class CommandPlugins extends Command {
	name = get_key("commands.plugins.name")
	description = get_key("commands.plugins.description")
	aliases = get_key("commands.plugins.aliases.pl")
	minArgs = 0
	maxArgs = 0

	/**
	 * @param {import("Frog").Player} player
	 */
	execute(player) {
		const pluginSet = new Set(PluginManager.plugins)
		const pluginList = Array.from(pluginSet)
			.map(plugin => `${Colors.RESET}${Colors.GREEN}${plugin.name} v${plugin.version}${Colors.RESET}`)
			.join(", ") || ""

		const message = get_key("commands.plugins.execution.success")
			.replace("%s", `(${pluginSet.size}): ${pluginList || ""} ${Colors.RESET}`)

		player.send_message(message)
	}
}

module.exports = CommandPlugins
