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
const { players: playerList } = require("../api/PlayerInfo");
const { lang, config } = require("../api/ServerInfo");
const Logger = require("../server/Logger");

class CommandList extends require("./Command") {
	name() {
		return lang.commands.listc;
	}

	aliases() {
		return null;
	}

	execute(isconsole = true, client) {
		const onlinePlayerList = playerList.filter((player) => !player.offline);
		const playerNames = onlinePlayerList.map((player) => player.username);
		const playerCount = onlinePlayerList.length;
		const playerListMessage = lang.commands.playerList.replace("%info%", `${playerCount}/${config.maxPlayers}`);

		if (!isconsole) {
			client.sendMessage(playerListMessage);
			if (playerCount > 0) {
				client.sendMessage(playerNames.join(", "));
			}
			return;
		}

		Logger.info(playerListMessage);
		if (playerCount > 0) {
			Logger.info(playerNames.join(", "));
		}
	}

	getPlayerDescription() {
		return lang.commands.ingameListDescription;
	}

	executePlayer(client) {
		if (!config.playerCommandList) {
			client.sendMessage(lang.errors.playerUnknownCommand);
			return;
		}

		this.execute(false, client);
	}
}

module.exports = CommandList;
