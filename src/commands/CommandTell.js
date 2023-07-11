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
 * @link Github - https://github.com/aboxofrats/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const { get: getPlayerInfo } = require("../api/player/PlayerInfo");
const { getKey } = require("../utils/Language");

/**
 * A command that sends a private message to other players
 *
 * @type {import('../../types/interfaces/Command').Command}
 */
module.exports = {
	data: {
		name: getKey("commands.tell.name"),
		description: getKey("commands.tell.description"),
		aliases: [getKey("commands.tell.aliases.w"), getKey("commands.tell.aliases.whisper"), getKey("commands.tell.aliases.msg")],
		minArgs: 2,
	},

	execute(_server, player, args) {
		const target = args[0];

		const message = args.slice(1).join(" ");

		try {
			getPlayerInfo(target).sendMessage(getKey("commands.tell.execution.success").replace("%s%", player.username).replace("%d%", player.username).replace("%f%", message));
			player.sendMessage(getKey("commands.tell.execution.success.whisper").replace("%s%", target).replace("%d%", message));
		} catch (e) {
			player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"));
		}
	},
};
