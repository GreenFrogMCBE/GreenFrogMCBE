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
const Command = require("./Command");

const { getPlayer } = require("../player/PlayerInfo");

const { getKey } = require("../utils/Language");

/**
 * Returns if the coordinates are valid
 * 
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @private
 */
function areCoordinatesValid(x, y, z) {
	return !isNaN(x) && !isNaN(y) && !isNaN(z);
}

/**
 * A command that shows the sender to other players
 */
class CommandTp extends Command {
	name = getKey("commands.teleport.name")
	description = getKey("commands.teleport.description")
	aliases = [getKey("commands.teleport.aliases.tp")]
	minArgs = 1
	maxArgs = 4
	requiresOp = true

	/**
	 * @param {import("Frog").Player} player 
	 * @param {import("frog-protocol").Server} server 
	 * @param {string[]} args 
	 */
	async execute(player, server, args) {
		const target = getPlayer(args[0]);
		const x = Number(args[1]);
		const y = Number(args[2]);
		const z = Number(args[3]);

		if (args.length >= 4) {	// Teleport player to coordinates
			if (target && areCoordinatesValid(x, y, z)) {
				player.teleport(x, y, z);

				player.sendMessage(
					getKey("commands.teleport.execution.success")
						.replace("%s", `${x}, ${y}, ${z}`)
				);
				player.sendMessage(
					getKey("commands.teleport.execution.success.teleported")
						.replace("%s", player.username)
						.replace("%d", `${x}, ${y}, ${z}`)
				);
			} else {
				player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"));
			}
		} else if (args.length > 0 && args.length < 2) { // Teleport self to player
			if (player.isConsole) {
				player.sendMessage(getKey("commands.errors.internalError.badSender"));
				return;
			}

			const destinationPlayer = getPlayer(args[0]);

			if (destinationPlayer && destinationPlayer.location) {
				const { x, y, z } = destinationPlayer.location;

				player.teleport(x, y, z);

				player.sendMessage(
					getKey("commands.teleport.execution.success")
						.replace("%s", `${x}, ${y}, ${z}`)
				);
				player.sendMessage(
					getKey("commands.teleport.execution.success.teleported")
						.replace("%s", player.username)
						.replace("%d", `${x}, ${y}, ${z}`)
				);
			} else {
				player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"));
			}
		} else if (args.length > 0 && args.length < 3) { // Teleport player to player
			const target = getPlayer(args[0]);
			const destinationPlayer = getPlayer(args[1]);

			if (target && destinationPlayer && destinationPlayer.location) {
				const { x, y, z } = destinationPlayer.location;
				target.teleport(x, y, z);

				player.sendMessage(
					getKey("commands.teleport.execution.success")
						.replace("%s", `${x}, ${y}, ${z}`)
				);
				player.sendMessage(
					getKey("commands.teleport.execution.success.teleported")
						.replace("%s", player.username)
						.replace("%d", `${x}, ${y}, ${z}`)
				);
			} else {
				player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"));
			}
		} else if (args.length >= 3) { // Teleport self to coords
			if (player.isConsole) {
				player.sendMessage(getKey("commands.errors.internalError.badSender"));
				return;
			}

			const x = Number(args[0]);
			const y = Number(args[1]);
			const z = Number(args[2]);

			if (areCoordinatesValid(x, y, z)) {
				player.teleport(x, y, z);

				player.sendMessage(
					getKey("commands.teleport.execution.success")
						.replace("%s", `${x}, ${y}, ${z}`)
				);
				player.sendMessage(
					getKey("commands.teleport.execution.success.teleported")
						.replace("%s", player.username)
						.replace("%d", `${x}, ${y}, ${z}`)
				);
			} else {
				player.sendMessage(getKey("commands.teleport.execution.failed.coordinates.invalid"));
			}
		}
	}
}

module.exports = CommandTp;