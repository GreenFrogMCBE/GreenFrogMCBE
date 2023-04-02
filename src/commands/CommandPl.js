const Logger = require("../server/Logger");
const PlayerColors = require("../api/PlayerColors");
const { lang, config } = require("../api/ServerInfo");
const PluginManager = require('../plugins/PluginManager')

/**
 * @type {import('../base/Command').Command}
 */
module.exports = {
	execute(_, player) {
		if (!config.playerCommandPlugins) {
			Logger.log(lang.errors.playerUnknownCommand);
			return;
		}

		const plugins = PluginManager.getPlugins()?.length ?? 0;
		const pluginList = PlayerColors.GREEN + PluginManager.getPlugins()?.join(PlayerColors.WHITE + "§7, " + PlayerColors.GREEN) || "";

		player.sendMessage(`${lang.commands.plugins} (${plugins}): ${pluginList ?? "No plugins available"} ${PlayerColors.RESET}`);
	},

	data: {
		name: "plugins",
		description: "Shows list of plugins that the server is running.",
		aliases: ['pl'],
		minArg: 0,
		maxArg: 0,
	},
};
