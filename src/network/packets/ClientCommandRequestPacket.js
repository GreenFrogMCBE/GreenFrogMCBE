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
const Frog = require("../../Frog");

const Logger = require("../../server/Logger");

const Commands = require("../../server/Commands");

const PacketConstructor = require("./PacketConstructor");

const { getKey } = require("../../utils/Language");

class ClientCommandRequestPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "command_request";
	}

	/**
	 * Returns if the packet is critical?
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Reads the packet from client
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} server
	 */
	async readPacket(player, packet, server) {
		const executedCommand = packet.data.params.command.replace('/', '');

		const args = executedCommand.split(" ").slice(1);

		let shouldExecuteCommand = true

		Frog.eventEmitter.emit('playerExecutedCommand', {
			player,
			server,
			args,
			command: executedCommand,
			cancel: () => {
				shouldExecuteCommand = false
			}
		})

		if (!shouldExecuteCommand) return

		try {
			Logger.info(getKey("commands.ingame.executed").replace("%s%", player.username).replace("%d%", executedCommand))

			if (!executedCommand.replace(" ", "")) return;

			let commandFound = false;

			for (const command of Commands.commandList) {
				if (
					command.data.name === executedCommand.split(" ")[0] ||
					(command.data.aliases && command.data.aliases.includes(executedCommand.split(" ")[0]))
				) {
					if (
						command.data.minArgs !== undefined &&
						command.data.minArgs > args.length
					) {
						player.sendMessage(
							getKey("commands.errors.syntaxError.minArg")
								.replace("%s%", command.data.minArgs)
								.replace("%d%", args.length)
						);
						return;
					}

					if (
						command.data.maxArgs !== undefined &&
						command.data.maxArgs < args.length
					) {
						player.sendMessage(
							getKey("commands.errors.syntaxError.maxArg")
								.replace("%s%", command.data.maxArgs)
								.replace("%d%", args.length)
						);
						return;
					}

					command.execute(Frog, player, args);

					commandFound = true;
					break; // Exit loop once command has been found and executed
				}
			}

			if (!commandFound) {
				player.sendMessage(
					getKey("commands.unknown").replace(
						"%s%",
						executedCommand.split(" ")[0]
					)
				);
			}
		} catch (error) {
			Logger.error(getKey("commands.internalError.player").replace("%s%", player.username).replace("%d%", error.stack));
		}
	}
}

module.exports = ClientCommandRequestPacket;
