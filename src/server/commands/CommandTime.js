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
const { players } = require("../../player/PlayerInfo");
const { lang, config } = require("../../server/ServerInfo");

class CommandTime extends require("./Command") {
	name() {
		return lang.commands.time;
	}

	aliases() {
		return null;
	}

	getPlayerDescription() {
		return lang.commands.ingameTimeDescription;
	}

	execute(args) {
		if (!args) {
			Logger.log(lang.commands.usageTime);
			return;
		}

		const time = args[1];
		const setTime = time === 'day' ? 1000 : time === 'night' ? 17000 : parseInt(time, 10);

		if (!Number.isInteger(setTime)) {
			Logger.log(lang.commands.usageTime);
			return;
		}

		players.forEach((client) => client.setTime(setTime));
		Logger.log(lang.commands.timeUpdated);
	}

	executePlayer(client, args) {
		if (!config.consoleCommandTime) {
			client.sendMessage(`§c${lang.errors.unknownCommand}`);
			return;
		}

		const time = args.split(' ')[1];
		const setTime = time === 'day' ? 1000 : time === 'night' ? 17000 : parseInt(time, 10);

		if (!Number.isInteger(setTime)) {
			client.sendMessage(`§c${lang.commands.usageTime}`);
			return;
		}

		players.forEach((client) => client.setTime(setTime));
		client.sendMessage(lang.commands.timeUpdated);
	}
}

module.exports = CommandTime;
