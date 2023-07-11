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
 * @link Github - https://github.com/kotinash/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const PluginManager = require("../plugins/PluginManager");

const Colors = require("../api/color/Colors");

const { getKey } = require("../utils/Language");

/**
 * A command that all the plugin this server uses
 *
 * @type {import('../../types/interfaces/Command').Command}
 */
module.exports = {
	data: {
		name: getKey("commands.plugins.name"),
		description: getKey("commands.plugins.description"),
		aliases: [getKey("commands.plugins.aliases.pl")],
		minArgs: 0,
		maxArgs: 0,
	},

	execute(_server, player) {
		const pluginSet = new Set(PluginManager.plugins);
		const pluginList = Colors.GREEN + [...pluginSet].join(Colors.WHITE + "§7, " + Colors.GREEN) || "";

		player.sendMessage(getKey("commands.plugins.execution.success").replace("%s^1%", `(${pluginSet.size}): ${pluginList || ""} ${Colors.RESET}`));
	},
};
