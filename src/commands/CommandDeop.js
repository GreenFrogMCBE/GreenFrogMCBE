const fs = require("fs").promises;

const Colors = require("../api/colors/Colors");
const { get: getPlayerInfo } = require("../api/player/PlayerInfo");

const Frog = require("../Frog");
const { serverConfigurationFiles } = Frog;
const { lang } = serverConfigurationFiles;

module.exports = {
    data: {
        name: "deop",
        description: "Revokes operator status from a player.",
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
            const ops = await fs.readFile("ops.yml", "utf-8");
            const updatedOps = ops.split("\n").filter(op => op !== playerName).join("\n");
            await fs.writeFile("ops.yml", updatedOps);

            try {
                getPlayerInfo(playerName).op = false;
            } catch { /** player is offline */ }

            player.sendMessage("Succeeded in revoking operator level for player " + playerName);
        } catch {
            player.sendMessage(`${Colors.RED}Failed to deop ${playerName}`);
        }
    }
};
