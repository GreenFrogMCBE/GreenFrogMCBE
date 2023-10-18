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

const Frog = require("../Frog");

const Colors = require("../utils/types/Colors");

const { getKey } = require("../utils/Language");

const { version } = Frog.config.serverInfo;

/**
 * A command that shows the server's version
 */
class CommandVersion extends Command {
	name = getKey("commands.version.name");
	description = getKey("commands.version.description");
	aliases = [
		getKey("commands.version.aliases.ver"), 
		getKey("commands.version.aliases.about")
	];
	minArgs = 0;
	maxArgs = 0;

	/**
	 * @param {import("Frog").Player} player
	 */
	async execute(player) {
		const message = getKey("server.version")
			.replace("%s", `${Frog.releaseData.minorServerVersion} (${Frog.releaseData.versionDescription})`)
			.replace("%d", version);

		player.sendMessage(`${Colors.GRAY}${message}`);
	}
}

module.exports = CommandVersion;
