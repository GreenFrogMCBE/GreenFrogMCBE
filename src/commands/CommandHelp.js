const Commands = require("../server/Commands");

const { getKey } = require("../utils/Language");

const CommandVerifier = require("../utils/CommandVerifier");

module.exports = {
    data: {
        name: getKey("commands.help.name"),
        description: getKey("commands.help.description"),
        aliases: ['?'],
        minArgs: 0,
        maxArgs: 0
    },

    execute(_server, player) {
        if (CommandVerifier.checkCommand(player, this.data)) {
            return;
        }

        player.sendMessage(getKey("commands.help.execution.success.commandList"))
        for (const command of Commands.commandList) {
            player.sendMessage(`${command.data.name} - ${command.data.description}`)
        }        
    },
};
