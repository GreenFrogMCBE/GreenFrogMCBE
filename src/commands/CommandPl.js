/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
const PluginManager = require("../plugins/PluginManager");
const { lang, config } = require("../api/ServerInfo");
const ConsoleColors = require("../api/ConsoleColors");
const PlayerColors = require("../api/PlayerColors");
const Logger = require("../server/Logger");

class CommandPl extends require("./Command") {
	name() {
		return lang.commands.pl;
	}

	aliases() {
		return [lang.commands.plugins];
	}

	execute() {
		const plugins = PluginManager.getPlugins()?.length ?? 0;
		const pluginList = ConsoleColors.CONSOLE_GREEN + PluginManager.getPlugins()?.join(ConsoleColors.CONSOLE_RESET + ", " + ConsoleColors.CONSOLE_GREEN) || "";

		Logger.info(`${lang.commands.plugins} (${plugins}): ${pluginList} ${ConsoleColors.CONSOLE_RESET}`);
	}

	getPlayerDescription() {
		return lang.commands.ingamePlDescription;
	}

	executePlayer(player) {
		if (!config.playerCommandPlugins) {
			Logger.info(lang.errors.playerUnknownCommand);
			return;
		}

		const plugins = PluginManager.getPlugins()?.length ?? 0;
		const pluginList = PlayerColors.GREEN + PluginManager.getPlugins()?.join(PlayerColors.white + ", " + PlayerColors.GREEN) || "";

		player.sendMessage(`${lang.commands.plugins} (${plugins}): ${pluginList} ${PlayerColors.reset}`);
	}
}

module.exports = CommandPl;
