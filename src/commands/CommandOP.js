/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */

const fs = require("fs").promises;

const { get: getPlayerInfo } = require("../api/player/PlayerInfo");

const Frog = require("../Frog");
const { serverConfigurationFiles } = Frog
const { lang } = serverConfigurationFiles

module.exports = {
    data: {
        name: "op",
        description: "Grants operator status to a player.",
        minArgs: 1,
        maxArgs: 1,
    },

    async execute(_server, player, args) {
        if (!player.op) {
            player.sendMessage(lang.errors.unknownCommandOrNoPermission);
            return;
        }

        const playerName = args[0];

        try {
            await fs.appendFile("ops.yml", playerName + "\n");
            
            try {
                getPlayerInfo(playerName).op = true;
            } catch { /** player is offline */ }
            
            player.sendMessage("Succeeded in setting operator level for player " + playerName);
        } catch {
            player.sendMessage("Failed to OP " + playerName);
        }
    }
};
