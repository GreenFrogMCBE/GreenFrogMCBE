const Logger = require("../server/Logger");
const PlayerColors = require("../api/PlayerColors");
const ConsoleColors = require("../api/ConsoleColors");
const { lang, config } = require("../api/ServerInfo");
const PluginManager = require('../plugins/PluginManager')

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

		Logger.log(`${lang.commands.plugins} (${plugins}): ${pluginlist ?? "No plugins available"} ${ConsoleColors.CONSOLE_RESET}`);
	},

	run(_server, player) {
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
		description: "Plugins command.",
		aliases: ['pl'],
		minArg: 0,
		maxArg: 0,
	},
};
