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
const PlayerInfo = require("../api/PlayerInfo");
const Logger = require("../server/Logger");

module.exports = {
	/**
	 * Removes data of offline players
	 */
	clearOfflinePlayers() {
		for (let i = 0; i < PlayerInfo.players.length; i++) {
			if (PlayerInfo.players[i].offline) {
				Logger.debug("[Garbage collector] Deleted " + PlayerInfo.players[i].username);
				PlayerInfo.players.splice(i, 1);
				i--;
			}
		}
	},

	/**
	 * Clears RAM from useless entries
	 */
	gc() {
		Logger.debug("[Garbage collector] Starting Garbage-collect everything...");
		this.clearOfflinePlayers();

		for (let i = 0; i < PlayerInfo.players.length; i++) {
			delete PlayerInfo.players[i].q;
			delete PlayerInfo.players[i].q2;
			delete PlayerInfo.players[i].profile;
			delete PlayerInfo.players[i].skinData;
			delete PlayerInfo.players[i].userData;
		}

		Logger.debug("[Garbage collector] Finished");
	},
};
