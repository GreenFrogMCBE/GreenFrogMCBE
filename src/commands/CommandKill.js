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
const Gamemode = require("../api/player/Gamemode");
const PlayerInfo = require("../api/player/PlayerInfo");
const DamageCause = require("../api/health/DamageCause");

const { get: getPlayerInfo } = require("../api/player/PlayerInfo");
const { getKey } = require("../utils/Language");
const Logger = require("../server/Logger");

/**
 * @param {import("frog-protocol").Client} player 
 */
const canBeKilled = (player) => {
    if (player.gamemode === Gamemode.CREATIVE || player.gamemode === Gamemode.SPECTATOR) {
        return false;
    }

    return true;
};

/**
 * A command that sends a private message to other players
 * 
 * @type {import('../declarations/Command').Command}
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
                player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"));
                return;
            }
            if(player.isConsole){
                Logger.error(getKey("commands.kill.execution.failed.killServer"))
                return;
            }
            player.setHealth(0, DamageCause.KILL_COMMAND);
        } else {
            if (args[0] === "@a") {
                PlayerInfo.players.forEach(p => {
                    if (canBeKilled(p)) {
                        p.setHealth(0, DamageCause.KILL_COMMAND);
                        return;
                    }
                });

                return;
            } else if (args[0] === "@r") {
                const randomPlayer = Math.floor(Math.random() * PlayerInfo.players.length);
                const subject = PlayerInfo.players[randomPlayer];

                if (!canBeKilled(subject)) {
                    player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"));
                    return;
                }

                subject.setHealth(0, DamageCause.KILL_COMMAND);
                return;
            }

            try {
                const subject = getPlayerInfo(args[0]);

                if (!canBeKilled(subject)) {
                    player.sendMessage(getKey("commands.errors.targetError.targetsNotFound"));
                    return;
                }

                subject.setHealth(0, DamageCause.KILL_COMMAND);
            } catch {
                player.sendMessage(getKey("commands.kill.execution.failed.notOnline").replace("%s%", args[0]));
            }
        }
    },
};
