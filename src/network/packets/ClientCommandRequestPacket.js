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

const { serverConfigurationFiles } = Frog
const { lang } = serverConfigurationFiles

const Commands = require("../../server/Commands");

const PacketConstructor = require("./PacketConstructor");

class ClientCommandRequestPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "command_request";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
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
		const input = packet.data.params.command.replace('/', '');

		const args = input.split(" ").slice(1);

		let shouldExecCommand = true

		Frog.eventEmitter.emit('playerExecutedCommand', {
			player,
			server,
			args,
			command: input,
			cancel() {
				shouldExecCommand = false
			}
		})

		if (!shouldExecCommand) return

		try {
			Logger.info(`${player.username} executed server command: /${input}`)

			if (!input.replace(" ", "")) return;

			let commandFound = false;

			for (const command of Commands.commandList) {
				if (
					command.data.name === input.split(" ")[0] ||
					(command.data.aliases && command.data.aliases.includes(input.split(" ")[0]))
				) {
					if (
						command.data.minArgs !== undefined &&
						command.data.minArgs > args.length
					) {
						player.sendMessage(
							lang.commands.minArg
								.replace("%m%", command.data.minArgs)
								.replace("%r%", args.length)
						);
						return;
					}

					if (
						command.data.maxArgs !== undefined &&
						command.data.maxArgs < args.length
					) {
						player.sendMessage(
							lang.commands.maxArg
								.replace("%m%", command.data.maxArgs)
								.replace("%r%", args.length)
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
					lang.errors.unknownCommandOrNoPermission.replace(
						"%commandname%",
						input.split(" ")[0]
					)
				);
			}
		} catch (error) {
			player.sendMessage("§cSomething went wrong while trying to execute that command")
			Logger.error(`Failed to execute command from ${player.username}. Error: ${error.stack}`);
		}
	}
}

module.exports = ClientCommandRequestPacket;
