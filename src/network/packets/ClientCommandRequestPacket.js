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
const Frog = require("../../Frog")

const Logger = require("../../utils/Logger")
const CommandManager = require("../../server/CommandManager")
const CommandVerifier = require("../../utils/CommandVerifier")

const Packet = require("./Packet")

const { get_key } = require("../../utils/Language")

const config = Frog.config

class ClientCommandRequestPacket extends Packet {
	name = "command_request"

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async read_packet(player, packet) {
		if (Frog.config.chat.features.commands) return

		let executed_command = packet.data.params.command.replace("/", "")

		const args = executed_command.split(" ").slice(1)

		let should_execute_command = true

		Frog.event_emitter.emit("playerCommand", {
			player,
			args,
			command: executed_command,
			cancel: () => {
				should_execute_command = false
			},
		})

		if (!should_execute_command) return

		if (config.chat.block_invalid_packets.commands) {
			executed_command = executed_command
				.replace("%d", executed_command.replace("§", ""))

			if (executed_command > 256) {
				return Frog.event_emitter.emit("playerMalformatedChatCommand", {
					player,
					command: executed_command,
				})
			}
		}

		Logger.info(get_key("commands.ingame.executed").replace("%s", player.username).replace("%d", executed_command))

		try {
			let command_found = false

			for (const command of CommandManager.commands) {
				if (command.name === executed_command.split(" ")[0] || (command.aliases && command.aliases.includes(executed_command.split(" ")[0]))) {
					if (command.requiresOp && !player.permissions.op) {
						CommandVerifier.throw_error(player, executed_command.split(" ")[0])
						return
					}

					if (command.minArgs !== undefined && command.minArgs > args.length) {
						player.send_message(get_key("commands.errors.syntaxError.minArg").replace("%s", command.minArgs).replace("%d", args.length))
						return
					}

					if (command.maxArgs !== undefined && command.maxArgs < args.length) {
						player.send_message(get_key("commands.errors.syntaxError.maxArg").replace("%s", command.maxArgs).replace("%d", args.length))
						return
					}

					command.execute(player, Frog, args)

					command_found = true
					break
				}
			}

			if (!command_found) {
				CommandVerifier.throw_error(player, executed_command.split(" ")[0])
			}
		} catch (error) {
			Logger.error(get_key("commands.errors.internalError.player").replace("%s", player.username).replace("%d", error.stack))
		}
	}
}

module.exports = ClientCommandRequestPacket
