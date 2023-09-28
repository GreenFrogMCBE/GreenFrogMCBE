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
const Command = require("./Command");

const PluginManager = require("../plugins/PluginManager");

const Colors = require("../utils/types/Colors");

const { getKey } = require("../utils/Language");

/**
 * A command that all the plugin this server uses
 */
class CommandPlugins extends Command {
	name = getKey("commands.plugins.name");
	description = getKey("commands.plugins.description");
	aliases = getKey("commands.plugins.aliases.pl");
	minArgs = 0;
	maxArgs = 0;

	/**
	 * @param {import("Frog").Player} player
	 */
	execute(player) {
		const pluginSet = new Set(PluginManager.plugins);
		const pluginList = [...pluginSet].map((plugin) => `§r§a${plugin.name} v${plugin.version}§r`).join(", ") || "";

		player.sendMessage(getKey("commands.plugins.execution.success").replace("%s", `(${pluginSet.size}): ${pluginList || ""} ${Colors.RESET}`));
	}
}

module.exports = CommandPlugins;
