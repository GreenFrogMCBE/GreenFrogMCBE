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

const { lang, config } = require("../api/ServerInfo");
const { get } = require("../api/PlayerInfo");

class CommandKick extends require("./Command") {
	name() {
		return lang.commands.kick;
	}

	aliases() {
		return null;
	}

	getPlayerDescription() {
		return lang.commands.ingameKickDescription;
	}

	execute(args) {
		if (!args || !args[0]) {
			Logger.info(lang.commands.usageKick);
			return;
		}

		const targetUsername = args[0];
		const reason = args[1] || lang.kickmessages.noReason;

		const target = get(targetUsername);

		if (target) {
			target.kick(`${lang.kickmessages.kickedPrefix}${reason}`);
			Logger.info(`${lang.kickmessages.kickedConsoleMsg.replace("%player%", targetUsername).replace("%reason%", reason)}`);
		} else {
			Logger.info(lang.errors.playerOffline);
		}
	}

	executePlayer(client, args) {
		if (!config.playerCommandKick) {
			client.sendMessage(lang.errors.playerUnknownCommand);
			return;
		}

		if (!client.op) {
			client.sendMessage(lang.errors.noPermission);
			return;
		}

		if (!args.split(" ") || !args.split(" ")[1]) {
			client.sendMessage("§c" + lang.commands.usageKick);
			return;
		}

		const targetUsername = args.split(" ")[1];
		let reason = "";
		for (let i = 2; i < args.split(" "); i++) {
			reason = reason + args.split(" ")[i];
		}
		if (!reason) reason = lang.kickmessages.noReason;

		const target = get(targetUsername);

		if (target) {
			target.kick(`${lang.kickmessages.kickedPrefix}${reason}`);
			client.sendMessage(`${lang.kickmessages.kickedConsoleMsg.replace("%player%", targetUsername).replace("%reason%", reason)}`);
		} else {
			client.sendMessage("§c" + lang.errors.playerOffline);
		}
	}
}

module.exports = CommandKick;
