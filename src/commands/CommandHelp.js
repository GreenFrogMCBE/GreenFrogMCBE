const Commands = require("../server/Commands");

const { getKey } = require("../utils/Language");

module.exports = {
    data: {
        name: getKey("commands.help.name"),
        description: getKey("commands.help.description"),
        aliases: ['?'],
        minArgs: 0,
        maxArgs: 0
    },

    execute(_server, player) {
        player.sendMessage(getKey("commands.help.execution.success"))
        for (const command of Commands.commandList) {
            player.sendMessage(`${command.data.name} - ${command.data.description}`)
        }        
    },
};
