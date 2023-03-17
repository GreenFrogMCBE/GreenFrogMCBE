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
const PlayerCommandExecuteEvent = require("../../../events/PlayerCommandExecuteEvent");
const { lang, config } = require("../../../api/ServerInfo");

class CommandRequest extends require("./Handler") {
	validate(client, cmd) {
		if (!cmd || cmd.includes("§") || (cmd.length > 255 && config.blockInvalidMessages)) {
			if (client.op) return;
			client.kick(lang.kickmessages.invalidChatMessage);
		}
	}

	handle(client, packet) {
		if (config.commandsDisabled) return;

		let cmd = packet.data.params.command;
		this.validate(client, cmd);
		new PlayerCommandExecuteEvent().execute(require("../../../Server").server, client, cmd);
	}
}

module.exports = CommandRequest;
