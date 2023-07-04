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
const { get: getPlayerInfo } = require("../api/player/PlayerInfo");

/**
 * A command that shows the sender to other players
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
    data: {
        name: "tp",
        description: "Teleports a player",
        aliases: ["teleport"],
        minArgs: 1,
        maxArgs: 4,
        requiresOp: true,
    },

    execute(_server, player, args) {
        if (player.isConsole) {
            player.sendMessage(getKey("commands.internalError.badSender"));
            return;
        }

        if (args.length >= 3) {
            // Tp self to coords
            const x = args[0];
            const y = args[1];
            const z = args[2];
            if (areCoordinatesPresent(x, y, z)) {
                player.teleport(x, y, z);
                player.sendMessage(`You were teleported to ${x} ${y} ${z}`);
            } else {
                player.sendMessage("Invalid coordinates");
            }
        } else if (args.length > 0 && args.length < 2) {
            // Tp self to player
            const destinationPlayerInfo = getPlayerInfo(args[0]);
            if (destinationPlayerInfo.location) {
                player.teleport(x, y, z);
                player.sendMessage(`You were teleported to player ${args[0]}`);
            } else {
                player.sendMessage("Invalid player");
            }
        } else if (args.length > 0 && args.length < 3) {
            // Tp player to player
            const subject = getPlayerInfo(args[0]);
            const destinationPlayerInfo = getPlayerInfo(args[1]);

            if (subject && destinationPlayerInfo && destinationPlayerInfo.location) {
                const { x, y, z } = destinationPlayerInfo.location;
                subject.teleport(x, y, z);
                player.sendMessage(`You have teleported player ${subject} to ${args[1]}`);
            } else {
                player.sendMessage("Invalid player or destination");
            }
        } else if (args.length >= 4) {
            // Tp player to coords
            const subject = getPlayerInfo(args[0]);
            const x = args[1];
            const y = args[2];
            const z = args[3];

            if (subject && areCoordinatesPresent(x, y, z)) {
                subject.teleport(x, y, z);
                player.sendMessage(`You have teleported player ${subject} to ${x} ${y} ${z}`);
            } else {
                player.sendMessage("Invalid player or coordinates");
            }
        }
    },
};

function areCoordinatesPresent(x, y, z) {
    return !isNaN(x) && !isNaN(y) && !isNaN(z);
}
