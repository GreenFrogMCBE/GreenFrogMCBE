/**
 * ██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
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

const Gamemode = require("../player/types/Gamemode");
const DamageCause = require("../player/types/DamageCause");

const PlayerInfo = require("../player/PlayerInfo");

const { getPlayer } = require("../player/PlayerInfo");

const { getKey } = require("../utils/Language");

const Selector = require("./types/Selector");
const ArgumentType = require("./types/ArgumentType");

/**
 * Returns if the player can be killed
 *
 * @param {import("Frog").Player} player
 * @returns {boolean}
 */
function canBeKilled(player) {
	if (
		player.permissions.isConsole ||
		player.gamemode === Gamemode.CREATIVE ||
		player.gamemode === Gamemode.SPECTATOR
	) {
		return false;
	}

	return true;
}

/**
 * Kills the specified player
 */
class CommandKill extends Command {
	name = getKey("commands.kill.name");
	description = getKey("commands.kill.description");
	minArgs = 0;
	requiresOp = true;
	args = [
		{
			name: "target",
			type: ArgumentType.TARGET,
			optional: true
		}
	];

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {string[]} args
	 */
	execute(player, server, args) {
		switch (args[0]) {
			case Selector.SELF:
			case undefined: {
				if (!canBeKilled(player)) {
					player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"));
					return;
				}

				player.setHealth(0, DamageCause.KILL_COMMAND);
				break;
			}
			case Selector.ALL_ENTITIES:
			case Selector.ALL_PLAYERS: {
				PlayerInfo.playersOnline.forEach((player) => {
					if (canBeKilled(player)) {
						player.setHealth(0, DamageCause.KILL_COMMAND);
					}
				});
				break;
			}
			case Selector.RANDOM_PLAYER: {
				const randomPlayer = Math.floor(Math.random() * PlayerInfo.playersOnline.length);
				const subject = PlayerInfo.playersOnline[randomPlayer];

				if (!canBeKilled(subject)) {
					player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"));
					return;
				}

				subject.setHealth(0, DamageCause.KILL_COMMAND);
				break;
			}
			default: {
				try {
					const subject = getPlayer(args[0]);

					if (!subject || !canBeKilled(subject)) {
						player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"));
						return;
					}

					subject.setHealth(0, DamageCause.KILL_COMMAND);
				} catch {
					player.sendMessage(getKey("commands.kill.execution.failed.notOnline").replace("%s", args[0]));
				}
				break;
			}
		}
	}
}

module.exports = CommandKill;
