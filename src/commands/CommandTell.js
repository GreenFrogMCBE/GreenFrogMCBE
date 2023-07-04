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

/**
 * A command that sends a private message to other players
 * 
 * @type {import('../type/Command').Command}
 */
module.exports = {
	data: {
		name: "tell",
		description: "Send private messages",
		aliases: ["w", "whisper", "msg"],
		minArgs: 2,
		maxArgs: 2,
	},

	execute(_server, player, args) {
        const { get: getPlayerInfo } = require("../api/player/PlayerInfo")

        const subject = args[0]
        const message = args[1]

        try {
            getPlayerInfo(subject).sendMessage(`§7§oFrom ${player.username}: ${message}`)
            player.sendMessage(`§7§oTo ${subject}: ${message}`)
        } catch (e) {
            player.sendMessage(`§cPlayer with the name of ${subject} isn't online.`)
        }
	},
};
