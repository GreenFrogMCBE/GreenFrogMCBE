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

// Has to be translated


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
        const { get: getPlayerInfo } = require("../api/player/PlayerInfo")

        if (args.length >= 3) {
            // Tp self to coords
            const x = args[0]
            const y = args[1]
            const z = args[2] 
            player.teleport(x, y, z)
            player.sendMessage(`§7You were teleported to ${x} ${y} ${z}`)
        } else if (args.length > 0 && args.length < 2) {
            // Tp self to player
            const destinationX = getPlayerInfo(args[0]).location.x
            const destinationY = getPlayerInfo(args[0]).location.y
            const destinationZ = getPlayerInfo(args[0]).location.z
            player.teleport(destinationX, destinationY, destinationZ)
        } else if (args.length > 0 && args.length < 3) {
            // Tp player to player
            const subject = getPlayerInfo(args[0])
            const destinationX = getPlayerInfo(args[1]).location.x
            const destinationY = getPlayerInfo(args[1]).location.y
            const destinationZ = getPlayerInfo(args[1]).location.z
            subject.teleport(destinationX, destinationY, destinationZ)
        } else if (args.length >= 4) {
            // Tp player to coords
            const subject = getPlayerInfo(args[0])
            const x = args[1]
            const y = args[2]
            const z = args[3]
            subject.teleport(x, y, z)
        }
	},
};
