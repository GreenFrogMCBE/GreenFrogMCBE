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
const DamageCause = require("../api/health/DamageCause");
const Gamemode = require("../api/player/Gamemode");

module.exports = {
	/**
	 * Calculates fall damage
	 * NOTE: This can be spoofed by a hacked client
	 *
	 * @param {Client} player
	 * @param {JSON} position
	 */
	async calculateFalldamage(player, position) {
		if (player.gamemode == Gamemode.CREATIVE || player.gamemode == Gamemode.SPECTATOR) return;

		let falldamageY = player.location.y - position.y;

		if (!falldamageY) return;

		if (falldamageY > 0.56 && player.fallDamageQueue) {
			player.setHealth(player.health - player.fallDamageQueue, DamageCause.FALL);
			player.fallDamageQueue = 0;
		}

		player.fallDamageQueue = (falldamageY + 0.5) * 2;
	},
};
