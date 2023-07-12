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
const { get: getPlayerInfo } = require("../api/player/PlayerInfo");
const { getKey } = require("../utils/Language");

/**
 * A command that shows the sender to other players
 *
 * @type {import('../../declarations/Command').Command}
 */
module.exports = {
	data: {
		name: getKey("commands.teleport.name"),
		description: getKey("commands.teleport.description"),
		aliases: [getKey("commands.teleport.aliases.tp")],
		minArgs: 1,
		maxArgs: 4,
		requiresOp: true,
	},

	execute(_server, player, args) {
		if (args.length >= 4) {
			// Teleport player to coordinates
			const target = getPlayerInfo(args[0]);
			const x = args[1];
			const y = args[2];
			const z = args[3];

			if (target && areCoordinatesPresent(x, y, z)) {
				player.teleport(x, y, z);

				player.sendMessage(getKey("commands.teleport.execution.success").replace("%s%", `${x}, ${y}, ${z}`));
				player.sendMessage(getKey("commands.teleport.execution.success.teleported").replace("%s%", player.username).replace("%d%", `${x}, ${y}, ${z}`));
			} else {
				player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"));
			}
		} else if (args.length > 0 && args.length < 2) {
			// Teleport self to player
			if (player.isConsole) {
				player.sendMessage(getKey("commands.errors.internalError.badSender"));
				return;
			}

			const destinationPlayer = getPlayerInfo(args[0]);

			if (destinationPlayer.location) {
				const { x, y, z } = destinationPlayer.location;

				player.teleport(x, y, z);

				player.sendMessage(getKey("commands.teleport.execution.success").replace("%s%", `${x}, ${y}, ${z}`));
				player.sendMessage(getKey("commands.teleport.execution.success.teleported").replace("%s%", player.username).replace("%d%", `${x}, ${y}, ${z}`));
			} else {
				player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"));
			}
		} else if (args.length > 0 && args.length < 3) {
			// Teleport player to player
			const target = getPlayerInfo(args[0]);
			const destinationPlayer = getPlayerInfo(args[1]);

			if (target && destinationPlayer && destinationPlayer.location) {
				const { x, y, z } = destinationPlayer.location;
				target.teleport(x, y, z);

				player.sendMessage(getKey("commands.teleport.execution.success").replace("%s%", `${x}, ${y}, ${z}`));
				player.sendMessage(getKey("commands.teleport.execution.success.teleported").replace("%s%", player.username).replace("%d%", `${x}, ${y}, ${z}`));
			} else {
				player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"));
			}
		} else if (args.length >= 3) {
			// Teleport self to coords
			if (player.isConsole) {
				player.sendMessage(getKey("commands.errors.internalError.badSender"));
				return;
			}

			const x = args[0];
			const y = args[1];
			const z = args[2];

			if (areCoordinatesPresent(x, y, z)) {
				player.teleport(x, y, z);

				player.sendMessage(getKey("commands.teleport.execution.success").replace("%s%", `${x}, ${y}, ${z}`));
				player.sendMessage(getKey("commands.teleport.execution.success.teleported").replace("%s%", player.username).replace("%d%", `${x}, ${y}, ${z}`));
			} else {
				player.sendMessage(getKey("commands.teleport.execution.failed.coordinates.invalid"));
			}
		}
	},
};

function areCoordinatesPresent(x, y, z) {
	return !isNaN(x) && !isNaN(y) && !isNaN(z);
}
