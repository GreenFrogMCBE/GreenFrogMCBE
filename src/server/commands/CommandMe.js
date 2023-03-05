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
const Chat = require("../../player/Chat");
const Logger = require("../Logger");
const { lang, config } = require("../ServerInfo");

class CommandMe extends require("./Command") {
	name() {
		return lang.commands.me;
	}

	aliases() {
		return null;
	}

	execute(msg = "", client = { username: lang.other.server }) {
		if (!msg.replace(/\s/g, "").length) {
			Logger.log(lang.commands.usageMe);
			return;
		}

		Chat.broadcastMessage(lang.commands.meCommandFormat.replace("%username%", client.username).replace("%message%", msg));
	}

	getPlayerDescription() {
		return lang.commands.ingameMeDescription;
	}

	executePlayer(client, msg) {
		if (!config.playerCommandMe) {
			client.sendMessage(lang.errors.playerUnknownCommand);
			return;
		}

		if (!msg.replace("/" + lang.commands.me, "").replace(/\s/g, "").length) {
			client.sendMessage("§c" + lang.commands.usageMe);
			return;
		}

		Chat.broadcastMessage(lang.commands.meCommandFormat.replace("%username%", client.username).replace("%message%", msg.replace("/" + lang.commands.me + " ", "")));
	}
}

module.exports = CommandMe;
