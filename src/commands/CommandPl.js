const Logger = require("../Logger");
const { lang, config } = require("../../server/ServerInfo");
const PluginManager = require('../../plugin/PluginManager')
const ConsoleColors = require("../api/ConsoleColors");
const PlayerColors = require("../api/PlayerColors");


/**
 * @type {import('../../base/Command').Command}
 */
module.exports = {
	runAsConsole() {
		let plugins;
		if (PluginManager.getPlugins() == null) {
			plugins = 0;
		} else {
			plugins = PluginManager.getPlugins().length;
		}

		let pluginlist = ConsoleColors.CONSOLE_GREEN + PluginManager.getPlugins().join(ConsoleColors.CONSOLE_RESET + ", " + ConsoleColors.CONSOLE_GREEN);

		Logger.log(`${lang.commands.plugins} (${plugins}): ${pluginlist ?? "No Plugins Available"} ${ConsoleColors.CONSOLE_RESET}`);
	},

	run(_server, player) {
		if (!config.playerCommandPlugins) {
			Logger.log(lang.errors.playerUnknownCommand);
			return;
		}

		const plugins = PluginManager.getPlugins()?.length ?? 0;
		const pluginList = PlayerColors.GREEN + PluginManager.getPlugins()?.join(PlayerColors.WHITE + "§7, " + PlayerColors.GREEN) || "";

		player.sendMessage(`${lang.commands.plugins} (${plugins}): ${pluginList ?? "No Plugin Available"} ${ColorsPlayer.reset}`);
	},

	data: {
		name: "plugins",
		description: "Plugins command.",
		aliases: ['pl'],
		minArg: 0,
		maxArg: 0,
	},
};
