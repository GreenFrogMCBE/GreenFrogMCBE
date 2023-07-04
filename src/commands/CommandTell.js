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
const { get: getPlayerInfo } = require("../api/player/PlayerInfo")

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
        minArgs: 2
    },

    execute(_server, player, args) {
        const target = args[0]

        const message = args.slice(1).join(" ")

        try {
            getPlayerInfo(target).sendMessage(`<${player.username}> §7§o${player.username} whispers to you: ${message}`)
            player.sendMessage(`You whisper to ${target}: ${message}`)
        } catch (e) {
            player.sendMessage(`§cNo targets matched selector`)
        }
    },
};
