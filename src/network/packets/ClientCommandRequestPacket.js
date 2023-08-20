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
const Frog = require("../../Frog");

const Logger = require("../../utils/Logger");
const CommandManager = require("../../server/CommandManager");
const CommandVerifier = require("../../utils/CommandVerifier");

const Packet = require("./Packet");

const { getKey } = require("../../utils/Language");

const config = Frog.config;

class ClientCommandRequestPacket extends Packet {
	name = "command_request";

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async readPacket(player, packet) {
		if (Frog.config.chat.features.commands) return;

		let executedCommand = packet.data.params.command.replace("/", "");

		const args = executedCommand.split(" ").slice(1);

		let shouldExecuteCommand = true;

		Frog.eventEmitter.emit("playerCommand", {
			player,
			args,
			command: executedCommand,
			cancel: () => {
				shouldExecuteCommand = false;
			},
		});

		if (!shouldExecuteCommand) return;

		if (config.chat.blockInvalidPackets.commands) {
			executedCommand = executedCommand.replace("%d", executedCommand.replace("§", ""));

			if (executedCommand > 256) {
				Frog.eventEmitter.emit("playerMalformatedChatCommand", {
					player,
					command: executedCommand,
				});
				return;
			}
		}

		Logger.info(getKey("commands.ingame.executed").replace("%s", player.username).replace("%d", executedCommand))

		try {
			let commandFound = false;

			for (const command of CommandManager.commands) {
				if (command.name === executedCommand.split(" ")[0] || (command.aliases && command.aliases.includes(executedCommand.split(" ")[0]))) {
					if (command.requiresOp && !player.permissions.op) {
						CommandVerifier.throwError(player, executedCommand.split(" ")[0]);
						return;
					}

					if (command.minArgs !== undefined && command.minArgs > args.length) {
						player.sendMessage(getKey("commands.errors.syntaxError.minArg").replace("%s", command.minArgs).replace("%d", args.length));
						return;
					}

					if (command.maxArgs !== undefined && command.maxArgs < args.length) {
						player.sendMessage(getKey("commands.errors.syntaxError.maxArg").replace("%s", command.maxArgs).replace("%d", args.length));
						return;
					}

					command.execute(player, Frog, args);

					commandFound = true;
					break;
				}
			}

			if (!commandFound) {
				CommandVerifier.throwError(player, executedCommand.split(" ")[0]);
			}
		} catch (error) {
			Logger.error(getKey("commands.errors.internalError.player").replace("%s", player.username).replace("%d", error.stack));
		}
	}
}

module.exports = ClientCommandRequestPacket;