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
 * @link Github - https://github.com/kotinash/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const { getKey } = require("../utils/Language");

const PlayerInfo = require("../api/player/PlayerInfo");

/**
 * A command that kicks the specified player
 *
 * @type {import('../../types/interfaces/Command').Command}
 */
module.exports = {
	data: {
		name: getKey("commands.kick.name"),
		description: getKey("commands.kick.description"),
		minArgs: 1,
		requiresOp: true,
	},

	execute(_server, player, args) {
		const playerName = args[0];

		let reason = ": " + args.slice(1).join(" ");

		if (reason === ": ") {
			reason = "";
		}

		const target = PlayerInfo.get(playerName);

		if (!target) {
			player.sendMessage(getKey("commands.kick.execution.failed.notOnline").replace("%s%", playerName));
			return;
		}

		target.kick(getKey("kickMessages.wereKicked").replace("%s%", reason));
	},
};
