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
const fs = require("fs").promises;
const Logger = require("../server/Logger");
const { lang, config } = require("../api/ServerInfo");

class CommandDeop extends require("./Command") {
	name() {
		return lang.commands.deop;
	}

	aliases() {
		return null;
	}

	async execute(args) {
		if (!args) {
			Logger.info(lang.commands.usageDeop);
			return;
		}

		try {
			const data = await fs.readFile("ops.yml", "utf-8");
			const players = data.trim().split("\n");
			const index = players.indexOf(args);

			if (index === -1) {
				Logger.info(lang.commands.notOp.replace("%player%", args));
				return;
			}

			players.splice(index, 1);
			const updatedPlayers = players.join("\n") + "\n";

			await fs.writeFile("ops.yml", updatedPlayers);
			Logger.info(lang.commands.deOpped.replace("%player%", args));
		} catch (err) {
			Logger.info(lang.commands.deopFail);
		}
	}

	getPlayerDescription() {
		return lang.commands.ingameDeopDescription;
	}

	async executePlayer(client, args) {
		if (!config.playerCommandDeop) {
			client.sendMessage("§c" + lang.errors.playerUnknownCommand);
			return;
		}

		if (!client.op) {
			client.sendMessage(lang.errors.noPermission);
			return;
		}

		if (!args.split(" ")[1]) {
			client.sendMessage("§c" + lang.commands.usageDeop);
			return;
		}

		try {
			const data = await fs.readFile("ops.yml", "utf-8");
			const players = data.trim().split("\n");
			const index = players.indexOf(args.split(" ")[1]);

			if (index === -1) {
				client.sendMessage("§c" + lang.commands.notOp.replace("%player%", args.split(" ")[1]));
				return;
			}

			players.splice(index, 1);
			const updatedPlayers = players.join("\n") + "\n";

			await fs.writeFile("ops.yml", updatedPlayers);
			client.sendMessage(lang.commands.deOpped.replace("%player%", args.split(" ")[1]));
		} catch (err) {
			client.sendMessage("§c" + lang.commands.deopFail);
		}
	}
}

module.exports = CommandDeop;
