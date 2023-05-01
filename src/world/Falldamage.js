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
	 * NOTE: This can be spoofed by hacked client
	 *
	 * @param {Client} player
	 * @param {JSON} position
	 */
	async calculateFalldamage(player, position) {
		if (player.gamemode == Gamemode.CREATIVE || player.gamemode == Gamemode.SPECTATOR) return;

		let falldamageY = player.y - position.y;

		if (player.on_ground && player.fallDamageQueue && !player.___dmgCd) {
			player.setHealth(player.health - player.fallDamageQueue * 2, DamageCause.FALL);
			player.fallDamageQueue = 0;
		}

		if (falldamageY < 0.4) {
			return;
		}

		player.fallDamageQueue = (falldamageY + 0.5) * 2;
	},

	/**
	 * This function calculates how much hunger the player must lose
	 *
	 * @param {Client} player
	 * @param {JSON} position
	 */
	async calculateHungerloss(player, position) {
		if (player.gamemode == Gamemode.CREATIVE || player.gamemode == Gamemode.SPECTATOR) return;

		if (position == !undefined && position.y == !player.y) return;

		if (Math.floor(Math.random() * 50) === 50) {
			// TODO: Vanilla behaviour
			player.setHunger(player.hunger - 1);
		}
	},
};
