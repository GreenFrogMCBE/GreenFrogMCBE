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

const { ChatColors } = require("@greenfrog/mc-enums")

const { get_key } = require("../utils/Language")

/**
 * A command that all the plugin this server uses
 */
class CommandPlugins extends Command {
	name = get_key("commands.plugins.name")
	description = get_key("commands.plugins.description")
	aliases = [ get_key("commands.plugins.aliases.pl") ]
	min_args = 0
	max_args = 0

	/**
	 * @param {import("Frog").Player} player
	 */
	execute(player) {
		const plugin_set = new Set(PluginManager.plugins)
		const plugin_list = Array.from(plugin_set)
			.map(({ name, version }) => `${ChatColors.Reset}${ChatColors.Green}${name} v${version}${ChatColors.Reset}`)
			.join(", ")

		const message = get_key("commands.plugins.execution.success", [
			`(${plugin_set.size}): ${plugin_list || ""} ${ChatColors.Reset}`
		])

		player.send_message(message)
	}
}

module.exports = CommandPlugins
