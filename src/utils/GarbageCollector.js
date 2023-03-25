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
const GarbageCollectionEvent = require("../events/GarbageCollectionEvent");
const GarbageOfflinePlayerCollectorEvent = require("../events/GarbageOfflinePlayerCollectorEvent");
const Logger = require("../server/Logger");

module.exports = {
	/**
	 * Removes data of offline players
	 */
	clearOfflinePlayers() {
		const garbageOfflinePlayerCollectorEvent = new GarbageOfflinePlayerCollectorEvent()
		garbageOfflinePlayerCollectorEvent.server = require("../Server")
		garbageOfflinePlayerCollectorEvent.execute()
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
		
		const garbageCollectionEvent = new GarbageCollectionEvent()
		garbageCollectionEvent.server = require("../Server")
		garbageCollectionEvent.execute()

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
