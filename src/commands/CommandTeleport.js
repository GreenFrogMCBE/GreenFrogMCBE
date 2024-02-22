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

const { ArgumentType } = require("@greenfrog/mc-enums")

const { get_player } = require("../player/PlayerInfo")

const { get_key } = require("../utils/Language")

/**
 * Teleport the player to specific coordinates
 *
 * @param {import("Frog").Player} player
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function teleport_to_coordinates(player, x, y, z) {
	player.teleport(
		x,
		y,
		z
	)

	player.send_message(
		get_key("commands.teleport.execution.success", [
			`${x}, ${y}, ${z}`
		])
	)

	player.send_message(
		get_key("commands.teleport.execution.success.teleported",
			[
				player.username,
				`${x}, ${y}, ${z}`
			]
		)
	)
}

/**
 * Teleport the player to another player
 *
 * @param {import("Frog").Player} player
 * @param {import("Frog").Player} target_player
 */
function teleport_player_to_player(player, target_player) {
	if (target_player && target_player.location) {
		const { x, y, z } = target_player.location

		return teleport_to_coordinates(player, x, y, z)
	}

	player.send_message(get_key("commands.errors.targetError.targetsNotFound"))
}

/**
 * A command that shows the sender to other players
 */
class CommandTeleport extends Command {
	name = get_key("commands.teleport.name")
	description = get_key("commands.teleport.description")
	aliases = [
		get_key("commands.teleport.aliases.tp")
	]
	min_args = 1
	max_args = 4
	requires_op = true
	args = [
		{
			name: "player",
			type: ArgumentType.Target,
			optional: false,
		},
		{
			name: "x",
			type: ArgumentType.Integer,
			optional: false,
		},
		{
			name: "y",
			type: ArgumentType.Integer,
			optional: false,
		},
		{
			name: "z",
			type: ArgumentType.Integer,
			optional: false,
		}
	]

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {string[]} args
	 */
	async execute(player, server, args) {
		const target = get_player(args[0])

		switch (args.length) {
			case 4: // Teleport player to coordinates
				const [x, y, z] = args.slice(1, 4).map(Number)

				if (target) {
					teleport_to_coordinates(player, x, y, z)
				} else {
					player.send_message(get_key("commands.errors.targetError.targetsNotFound"))
				}

				break
			case 1: // Teleport self to player
				if (player.permissions.is_console) {
					player.send_message(get_key("commands.errors.internalError.badSender"))
				} else {
					const destination_player = get_player(args[0])
					teleport_player_to_player(player, destination_player)
				}
				break

			case 2: // Teleport player to player
				const target_player = get_player(args[1])

				teleport_player_to_player(target, target_player)

				break
			case 3: // Teleport self to coordinates
				if (player.permissions.is_console) {
					player.send_message(get_key("commands.errors.internalError.badSender"))
				} else {
					const [x, y, z] = args.map(Number)

					teleport_to_coordinates(player, x, y, z)
				}
				break

			default:
				break
		}
	}
}

module.exports = CommandTeleport
