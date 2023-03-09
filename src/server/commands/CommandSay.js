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
const { lang, config } = require("../../server/ServerInfo");
const PlayerInfo = require("../../player/PlayerInfo");
const Logger = require("../Logger");

class CommandSay extends require("./Command") {
	name() {
		return lang.commands.say;
	}

	aliases() {
		return null;
	}

	execute(args) {
		if (!args) {
			Logger.info(lang.commands.usageSay);
			return;
		}

		const msg = lang.commands.sayCommandFormat.replace(`%message%`, args).replace(`%sender%`, "Server");

		PlayerInfo.players.forEach((client) => {
			client.sendMessage(msg);
		});

		Logger.info(msg);
	}

	getPlayerDescription() {
		return lang.commands.ingameSayDescription;
	}

	executePlayer(client, args) {
		if (!config.playerCommandSay) {
			client.sendMessage(lang.errors.playerUnknownCommand);
			return;
		}

		if (!client.op) {
			client.sendMessage(lang.errors.noPermission);
			return;
		}

		const message = args.split(" ")[1];
		if (!message) {
			client.sendMessage(`§c${lang.commands.usageSay}`);
			return;
		}

		const msg = lang.commands.sayCommandFormat.replace(`%message%`, message).replace(`%sender%`, client.username);

		PlayerInfo.players.forEach((client) => {
			client.sendMessage(msg);
		});

		Logger.info(msg);
	}
}

module.exports = CommandSay;
