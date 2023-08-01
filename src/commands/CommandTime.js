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
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const { players } = require("../api/player/PlayerInfo");

const { getKey } = require("../utils/Language");

/**
 * A command that changes the time
 *
 * @type {import('../../declarations/Command').Command}
 */
module.exports = {
	data: {
		name: getKey("commands.time.name"),
		description: getKey("commands.time.description"),
		minArgs: 1,
		maxArgs: 1,
		requiresOp: true,
	},

	execute(_server, player, args) {
		const time = args[0];

		const setTime = time === getKey("commands.time.times.day") ? 1000 : time === getKey("commands.time.times.night") ? 17000 : parseInt(time, 10);

		// eslint-disable-next-line use-isnan
		if (parseInt(setTime) === NaN) {
			player.sendMessage(getKey("commands.time.execution.failed"));
			return;
		}

		for (const player of players) {
			const parsedTime = parseInt(time);

			player.world.time = parsedTime;
			player.setTime(parsedTime);
		}

		player.sendMessage(getKey("commands.time.execution.success").replace("%s%", time));
	},
};
