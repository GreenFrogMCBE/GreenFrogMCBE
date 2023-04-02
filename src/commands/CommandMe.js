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
const Chat = require("../api/Chat");
const Logger = require("../server/Logger");
const { lang, config } = require("../api/ServerInfo");

class CommandMe extends require("./Command") {
	name = () => lang.commands.me;
	aliases = () => null;

	execute(msg = "", client = { username: lang.other.server }) {
		const message = msg.replace(/\s/g, "");
		if (!message) {
			Logger.info(lang.commands.usageMe);
			return;
		}

		const broadcastMessage = lang.commands.meCommandFormat.replace("%username%", client.username).replace("%message%", msg);
		Chat.broadcastMessage(broadcastMessage);
	}

	getPlayerDescription() {
		return lang.commands.ingameMeDescription;
	}

	executePlayer(client, msg) {
		if (!config.playerCommandMe) {
			client.sendMessage(lang.errors.playerUnknownCommand);
			return;
		}

		const message = msg.replace(`/${lang.commands.me}`, "").replace(/\s/g, "");
		if (!message) {
			client.sendMessage(`§c${lang.commands.usageMe}`);
			return;
		}

		const broadcastMessage = lang.commands.meCommandFormat.replace("%username%", client.username).replace("%message%", message);
		Chat.broadcastMessage(broadcastMessage);
	}
}

module.exports = CommandMe;
