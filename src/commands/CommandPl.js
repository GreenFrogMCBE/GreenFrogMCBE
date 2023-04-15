const CommandVerifier = require("../utils/CommandVerifier");

const PlayerColors = require("../api/colors/PlayerColors");
const PluginManager = require('../plugins/PluginManager');

const { serverConfigurationFiles } = require("../Frog");
const { lang } = serverConfigurationFiles;

/**
 * Command to show list of plugins that the server is running.
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
	data: {
		name: "plugins",
		description: "Shows list of plugins that the server is running.",
		aliases: ['pl'],
		minArg: 0,
		maxArg: 0,
	},

	execute(_server, player) {
		if (CommandVerifier.checkCommand(player, this.data)) {
			return;
		}

		const plugins = PluginManager.plugins?.length ?? 0;
		const pluginList = PlayerColors.GREEN + PluginManager.plugins?.join(PlayerColors.WHITE + "§7, " + PlayerColors.GREEN) || "";

		player.sendMessage(`${lang.commands.plugins} (${plugins}): ${pluginList || "No plugins available"} ${PlayerColors.RESET}`);
	},
};