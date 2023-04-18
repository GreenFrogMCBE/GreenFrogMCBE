const Frog = require("../Frog");
const Colors = require("../api/colors/Colors");

const PlayerInfo = require("../api/player/PlayerInfo");

const { serverConfigurationFiles } = Frog;
const { lang } = serverConfigurationFiles;

module.exports = {
    data: {
        name: "kick",
        description: "Kicks a player from the server.",
        minArgs: 1,
    },

    execute(_server, player, args) {
        if (!player.op) {
            player.sendMessage(lang.errors.unknownCommandOrNoPermission);
            return;
        }

        const playerName = args[0];
        const reason = (args.slice(1).join(' ') || lang.kickmessages.noReason).trim();

        const target = PlayerInfo.getPlayer(playerName);

        if (!target) {
            player.sendMessage(`${Colors.RED}${playerName} is not online`);
            return;
        }

        target.disconnect(`You were kicked: ${reason}`);
    },
};