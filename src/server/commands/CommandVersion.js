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
const Logger = require("../../server/Logger");
const { lang, config, serverversion } = require("../../server/ServerInfo");

class CommandVersion extends require("./Command") {
	name() {
		return lang.commands.version;
	}

	aliases() {
		return [lang.commands.ver];
	}

	execute() {
		if (!config.consoleCommandVersion) {
			Logger.log(lang.errors.unknownCommand);
			return;
		}

		Logger.log(lang.commands.verInfo.replace("%version%", serverversion));
	}

	getPlayerDescription() {
		return lang.commands.ingameVerDescription;
	}

	executePlayer(client) {
		client.sendMessage("§7" + lang.commands.verInfo.replace("%version%", serverversion));
		return;
	}
}

module.exports = CommandVersion;
