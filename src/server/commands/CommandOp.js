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
const Logger = require("../Logger");
const { lang, config } = require("../../server/ServerInfo");
const { get: getPlayerInfo } = require("../../player/PlayerInfo");

class CommandOp extends require("./Command") {
	name() {
		return lang.commands.op;
	}

	aliases() {
		return null;
	}

	async execute(args) {
		if (!args) {
			Logger.log(lang.commands.usageOp);
			return;
		}

		try {
			await fs.appendFile("ops.yml", args + "\n");
			Logger.log(lang.commands.opped.replace("%player%", args));
		} catch (err) {
			Logger.log(lang.commands.opFail);
		}
	}

	getPlayerDescription() {
		return lang.commands.ingameOpDescription;
	}

	async executePlayer(client, args) {
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

		try {
			await fs.appendFile("ops.yml", player + "\n");
			client.sendMessage(lang.commands.opped.replace("%player%", player));
			getPlayerInfo(player).op = true;
			console.log(getPlayerInfo(player));
		} catch (err) {
			client.sendMessage("§c" + lang.commands.opFail);
		}
	}
}

module.exports = CommandOp;
