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
 * @link Github - https://github.com/kotinash/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const PlayerInfo = require("../api/player/PlayerInfo");
const { get: getPlayerInfo } = require("../api/player/PlayerInfo");
const { getKey } = require("../utils/Language");

const canBeKilled = (player) => {
    if (player.gamemode === "creative" || player.gamemode === "spectator") {
        return false
    }

    return true
}

/**
 * A command that sends a private message to other players
 * 
 * @type {import('../type/Command').Command}
 */
module.exports = {
    data: {
        name: getKey("commands.kill.name"),
        description: getKey("commands.kill.description"),
        minArgs: 0,
        requiresOp: true,
    },
    execute(_server, player, args) {
        if (args.length === 0) {
            if (!canBeKilled(player)) { 
                player.sendMessage(getKey("commands.kill.execution.failed.isCreative")) 
                return
            }
            player.setHealth(0, "VOID")
        } else {
            if (args[0] === "@a" || args[0] === "all") {
                PlayerInfo.players.forEach(p => {
                    if (!canBeKilled(p)) { 
                        player.sendMessage(getKey("commands.kill.execution.failed.isCreative")) 
                        return
                    }
                    p.setHealth(0, "VOID")
                })
                return
            } else if (args[0] === "@r") {
                const randomPlayer = Math.floor(Math.random() * PlayerInfo.players.length)
                const subject = PlayerInfo.players[randomPlayer]
                if (!canBeKilled(subject)) { 
                    player.sendMessage(getKey("commands.kill.execution.failed.isCreative")) 
                    return
                }
                subject.setHealth(0, "VOID")
                return
            }

            try {
                const subject = getPlayerInfo(args[0])
                if (!canBeKilled(subject)) { 
                    player.sendMessage(getKey("commands.kill.execution.failed.isCreative")) 
                    return
                }
                subject.setHealth(0, "VOID")
            } catch (err) {
                player.sendMessage(
                    getKey("commands.kill.execution.failed.notOnline").replace("%s%", args[0])
                )
            }
        }
    },
};
