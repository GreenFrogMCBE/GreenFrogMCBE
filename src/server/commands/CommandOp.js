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
const fs = require("fs");
const Logger = require("../Logger");
const { lang, config } = require("../../server/ServerInfo");
const PlayerInfo = require("../../player/PlayerInfo");

class CommandOp extends require("./Command") {
	name() {
		return lang.commands.op;
	}

	aliases() {
		return null;
	}

	execute(args) {
		if (!args) {
			Logger.log(lang.commands.usageOp);
			return;
		}

		fs.appendFile("ops.yml", args + "\n", (err) => {
			if (!err) {
				Logger.log(lang.commands.opped.replace("%player%", args));
			} else Logger.log(lang.commands.opFail);
		});
	}

	getPlayerDescription() {
		return lang.commands.ingameOpDescription;
	}

	executePlayer(client, args) {
		if (!config.playerCommandOp) {
			client.sendMessage(lang.errors.playerUnknownCommand);
			return;
		}

		if (!client.op) {
			client.sendMessage(lang.errors.noPermission);
			return;
		}

		const player = args.split(" ")[1];
		if (!player) {
			client.sendMessage("§c" + lang.commands.usageOp);
			return;
		}

		fs.appendFile("ops.yml", player + "\n", (err) => {
			if (!err) {
				client.sendMessage(lang.commands.opped.replace("%player%", player));
				try {
					PlayerInfo.get(args.split(" ")[1]).op = true;
					console.log(PlayerInfo.get(args.split(" ")[1]));
				} catch (e) {
					/* ignored */
				}
			} else client.sendMessage("§c" + lang.commands.opFail);
		});
	}
}

module.exports = CommandOp;
