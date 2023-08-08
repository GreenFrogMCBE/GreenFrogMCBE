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

const { playersOnline } = require("../player/PlayerInfo");

const { getKey } = require("../utils/Language");

/**
 * A command that changes the time
 */
class CommandTime extends Command {
	name = getKey("commands.time.name")
	description = getKey("commands.time.description")
	minArgs = 1
	maxArgs = 1
	requiresOp = true

	/**
	 * @param {import("Frog").Player} player 
	 * @param {import("frog-protocol").Server} server 
	 * @param {string[]} args 
	 */
	async execute(player, server, args) {
		const time = args[0];

		const setTime = time === getKey("commands.time.times.day") ? 1000 : time === getKey("commands.time.times.night") ? 17000 : parseInt(time, 10);

		if (isNaN(Number(setTime))) {
			player.sendMessage(getKey("commands.time.execution.failed"));
			return;
		}

		const parsedTime = parseInt(time);

		for (const player of playersOnline) {
			player.world.time = parsedTime;
			player.setTime(parsedTime);
		}

		player.sendMessage(
			getKey("commands.time.execution.success")
				.replace("%s", time)
		);
	}
}

module.exports = CommandTime;