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
const Command = require("./Command")

const ArgumentType = require("./types/ArgumentType")

const { getPlayer } = require("../player/PlayerInfo")

const { getKey } = require("../utils/Language")

/**
 * Returns if the coordinates are valid
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @private
 */
function areCoordinatesValid(x, y, z) {
	return !isNaN(x) && !isNaN(y) && !isNaN(z)
}

/**
 * Teleport the player to specific coordinates
 *
 * @param {import("Frog").Player} player
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function teleportPlayerToCoordinates(player, x, y, z) {
	player.teleport(
		x,
		y,
		z
	)

	player.sendMessage(
		getKey("commands.teleport.execution.success")
			.replace("%s", `${x}, ${y}, ${z}`)
	)

	player.sendMessage(
		getKey("commands.teleport.execution.success.teleported")
			.replace("%s", player.username)
			.replace("%d", `${x}, ${y}, ${z}`)
	)
}

/**
 * Teleport the player to another player
 *
 * @param {import("Frog").Player} player
 * @param {import("Frog").Player} targetPlayer
 */
function teleportPlayerToPlayer(player, targetPlayer) {
	if (targetPlayer && targetPlayer.location) {
		const { x, y, z } = targetPlayer.location

		teleportPlayerToCoordinates(player, x, y, z)
	} else {
		player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"))
	}
}

/**
 * A command that shows the sender to other players
 */
class CommandTeleport extends Command {
	name = getKey("commands.teleport.name")
	description = getKey("commands.teleport.description")
	aliases = [
		getKey("commands.teleport.aliases.tp")
	]
	minArgs = 1
	maxArgs = 4
	requiresOp = true
	args = [
		{
			name: "player",
			type: ArgumentType.TARGET,
			optional: false,
		},
		{
			name: "x",
			type: ArgumentType.INT,
			optional: false,
		},
		{
			name: "y",
			type: ArgumentType.INT,
			optional: false,
		},
		{
			name: "z",
			type: ArgumentType.INT,
			optional: false,
		}
	]

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {string[]} args
	 */
	async execute(player, server, args) {
		const target = getPlayer(args[0])

		if (args.length >= 4) {	// Teleport player to coordinates
			const x = Number(args[1])
			const y = Number(args[2])
			const z = Number(args[3])

			if (target && areCoordinatesValid(x, y, z)) {
				teleportPlayerToCoordinates(player, x, y, z)
				return
			}

			player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"))
		} else if (args.length > 0 && args.length < 2) { // Teleport self to player
			if (player.permissions.isConsole) {
				player.sendMessage(getKey("commands.errors.internalError.badSender"))
				return
			}

			const destinationPlayer = getPlayer(args[0])

			teleportPlayerToPlayer(player, destinationPlayer)
		} else if (args.length > 0 && args.length < 3) { // Teleport player to player
			const destinationPlayer = getPlayer(args[1])

			teleportPlayerToPlayer(target, destinationPlayer)
		} else if (args.length >= 3) { // Teleport self to coordinates
			if (player.permissions.isConsole) {
				player.sendMessage(getKey("commands.errors.internalError.badSender"))
				return
			}

			const x = Number(args[0])
			const y = Number(args[1])
			const z = Number(args[2])

			if (areCoordinatesValid(x, y, z)) {
				teleportPlayerToCoordinates(player, x, y, z)
				return
			}

			player.sendMessage(getKey("commands.teleport.execution.failed.coordinates.invalid"))
		}
	}
}

module.exports = CommandTeleport
