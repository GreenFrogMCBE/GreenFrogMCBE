const Commands = require("../server/Commands");

const CommandVerifier = require("../utils/CommandVerifier");

module.exports = {
    data: {
        name: "help",
        description: "Command list.",
        minArgs: 0,
        maxArgs: 0
    },

    execute(_server, player) {
        if (CommandVerifier.checkCommand(player, this.data)) {
            return;
        }

        player.sendMessage(`Command list: `)
        for (const command of Commands.commandList) {
            player.sendMessage(`${command.data.name} - ${command.data.description}`)
        }        
    },
};
