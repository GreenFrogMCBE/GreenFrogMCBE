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
const Logger = require("../server/Logger");
const { lang, config, minorServerVersion } = require("../api/ServerInfo");

class CommandVersion extends require("./Command") {
	name() {
		return lang.commands.version;
	}

	aliases() {
		return [lang.commands.ver];
	}

	execute() {
		if (!config.consoleCommandVersion) {
			Logger.info(lang.errors.unknownCommand);
			return;
		}

		Logger.info(lang.commands.verInfo.replace("%version%", minorServerVersion));
	}

	getPlayerDescription() {
		return lang.commands.ingameVerDescription;
	}

	executePlayer(client) {
		client.sendMessage("§7" + lang.commands.verInfo.replace("%version%", minorServerVersion));
		return;
	}
}

module.exports = CommandVersion;
