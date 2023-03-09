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
const Logger = require("../Logger");
const { lang, config } = require("../../server/ServerInfo");

class CommandHelp extends require("./Command") {
	name() {
		return lang.commands.help;
	}

	aliases() {
		return ["?"];
	}

	execute() {
		Logger.info(lang.commands.list);

		const commandHelps = [
			{ command: "?", help: lang.commands.qmHelp },
			{ command: lang.commands.help, help: lang.commands.opHelp },
			{ command: lang.commands.me, help: lang.commands.meHelp },
			{ command: lang.commands.pl, help: lang.commands.plHelp },
			{ command: lang.commands.ver, help: lang.commands.verHelp },
			{ command: lang.commands.kick, help: lang.commands.kickHelp },
			{ command: lang.commands.time, help: lang.commands.timeHelp },
			{ command: lang.commands.stop, help: lang.commands.stopHelp },
			{ command: lang.commands.help, help: lang.commands.helpHelp },
			{ command: lang.commands.deop, help: lang.commands.deopHelp },
			{ command: lang.commands.listc, help: lang.commands.listHelp },
			{ command: lang.commands.version, help: lang.commands.versionHelp },
			{ command: lang.commands.plugins, help: lang.commands.pluginsHelp },
			{ command: lang.commands.stop, help: lang.commands.stopHelp },
		];

		const availableCommands = commandHelps.filter((help) => config[`consoleCommand${help.command.charAt(0).toUpperCase() + help.command.slice(1)}`]);

		if (availableCommands.length > 0) {
			availableCommands.forEach((help) => {
				Logger.info(help.help.replace("%green%", "\x1b[32m").replace("%cyan%", "\x1b[36m").replace("%white%", "\x1b[0m").replace("%blue%", "\x1b[34m") + "\x1b[0m");
			});
		} else {
			Logger.info(lang.commands.thereAreNoCommands);
		}
	}
}

module.exports = CommandHelp;
