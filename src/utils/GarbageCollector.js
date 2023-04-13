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

const Frog = require('../Frog');
const Logger = require('../server/Logger');

const PlayerInfo = require('../api/player/PlayerInfo');

module.exports = {
	/**
	 * Removes data of offline players
	 */
	clearOfflinePlayers() {
		Frog.eventEmitter.emit('serverOfflinePlayersGarbageCollection', {
			server: require('../Server'),
			players: PlayerInfo.players,
			cancel() {
				return false;
			},
		});

		for (let i = 0; i < PlayerInfo.players.length; i++) {
			if (PlayerInfo.players[i].offline) {
				Logger.debug('[Garbage collector] Deleted player: ' + PlayerInfo.players[i].username);
				PlayerInfo.players.splice(i, 1);
				i--;
			}
		}
	},

	/**
	 * Clears RAM from useless stuff
	 */
	gc() {
		Logger.debug('[Garbage collector] Started garbage collection...');
		this.clearOfflinePlayers();

		Frog.eventEmitter.emit('serverGarbageCollection', {
			server: require('../Server'),
			players: PlayerInfo.players,
			cancel() {
				return false;
			},
		});

		for (let i = 0; i < PlayerInfo.players.length; i++) {
			const player = PlayerInfo.players[i];

			this.removePlayerData(player, player.q)
			this.removePlayerData(player, player.q2)
			this.removePlayerData(player, player.profile)
			this.removePlayerData(player, player.skinData)
			this.removePlayerData(player, player.userData)
			this.removePlayerData(player, player.transfer)
			this.removePlayerData(player, player.kick)
			this.removePlayerData(player, player.disconnect)
			this.removePlayerData(player, player.sendMessage)
			this.removePlayerData(player, player.chat)
		}

		Logger.debug('[Garbage collector] Finished');
	},

	/**
	 * Removes player data
	 * 
	 * @param {Client} player 
	 * @param {String} data 
	 */
	removePlayerData(player, data) {
		if (player[data]) {
			Logger.info(`Removed ${data} from ${player.username}'s object`)

			delete player[data]
		}
	}
};
