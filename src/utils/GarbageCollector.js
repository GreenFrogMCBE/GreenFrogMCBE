/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Frog = require("../Frog");
const Logger = require("../server/Logger");

const PlayerInfo = require("../api/player/PlayerInfo");

const Language = require("./Language");

module.exports = {
	/**
	 * Removes data of offline players
	 */
	clearOfflinePlayers() {
		Frog.eventEmitter.emit("serverOfflinePlayersGarbageCollection", {
			server: require("../Server"),
			players: PlayerInfo.players,
		});

		for (let i = 0; i < PlayerInfo.players.length; i++) {
			const player = PlayerInfo.players[i].q;

			if (player) {
				Logger.debug(Language.getKey("garbageCollector.deleted").replace("%s%", player.username));
				PlayerInfo.players.splice(i, 1);
				i--;
			}
		}
	},

	/**
	 * Clears RAM from useless data
	 */
	gc() {
		Logger.debug(Language.getKey("garbageCollector.started"));

		this.clearOfflinePlayers();

		Frog.eventEmitter.emit("serverGarbageCollection", {
			server: require("../Server"),
			players: PlayerInfo.players,
		});

		for (let i = 0; i < PlayerInfo.players.length; i++) {
			const player = PlayerInfo.players[i];

			delete player.q;
			delete player.q2;
			delete player.profile;
			delete player.skinData;
			delete player.userData;
		}

		Logger.debug(Language.getKey("garbageCollector.finished"));
	},
};
