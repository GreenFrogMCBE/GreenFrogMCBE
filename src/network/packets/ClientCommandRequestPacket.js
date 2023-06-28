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
const Frog = require("../../Frog");

const Logger = require("../../server/Logger");

const Commands = require("../../server/Commands");

const PacketConstructor = require("./PacketConstructor");

const { serverConfigurationFiles } = Frog;
const { config } = serverConfigurationFiles;

const { getKey } = require("../../utils/Language");

const CommandVerifier = require("../../utils/CommandVerifier");

class ClientCommandRequestPacket extends PacketConstructor {
	name = 'command_request'

	async readPacket(player, packet, server) {
		let executedCommand = packet.data.params.command.replace("/", "");

		const args = executedCommand.split(" ").slice(1);

		let shouldExecuteCommand = true;

		Frog.eventEmitter.emit("playerExecutedCommand", {
			player,
			server,
			args,
			command: executedCommand,
			cancel: () => {
				shouldExecuteCommand = false;
			},
		});

		if (!shouldExecuteCommand) return;

		if (config.chat.blockInvalidCommands) {
			executedCommand = executedCommand.replace("%d%", executedCommand.replace("§", ""));

			if (executedCommand > 256) {
				Frog.eventEmitter.emit("playerMalformatedChatCommand", {
					server,
					player,
					command: executedCommand,
				});
				return;
			}
		}

		try {
			let commandFound = false;

			for (const command of Commands.commandList) {
				if (command.data.name === executedCommand.split(" ")[0] || (command.data.aliases && command.data.aliases.includes(executedCommand.split(" ")[0]))) {
					if (command.data.requiresOp && !player.op) {
						CommandVerifier.throwError(player, executedCommand.split(" ")[0]);
						return;
					}

					if (command.data.minArgs !== undefined && command.data.minArgs > args.length) {
						player.sendMessage(getKey("commands.errors.syntaxError.minArg").replace("%s%", command.data.minArgs).replace("%d%", args.length));
						return;
					}

					if (command.data.maxArgs !== undefined && command.data.maxArgs < args.length) {
						player.sendMessage(getKey("commands.errors.syntaxError.maxArg").replace("%s%", command.data.maxArgs).replace("%d%", args.length));
						return;
					}

					command.execute(Frog, player, args);

					commandFound = true;
					break; // Exit loop once command has been found and executed
				}
			}

			if (!commandFound) {
				CommandVerifier.throwError(player, executedCommand.split(" ")[0]);
			}
		} catch (error) {
			Logger.error(getKey("commands.internalError.player").replace("%s%", player.username).replace("%d%", error.stack));
		}
	}
}

module.exports = ClientCommandRequestPacket;
