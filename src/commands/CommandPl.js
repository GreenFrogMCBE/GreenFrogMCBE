const CommandVerifier = require("../utils/CommandVerifier");

const PluginManager = require('../plugins/PluginManager');

const Colors = require("../api/colors/Colors");

const { getKey } = require("../utils/Language");

/**
 * Command to show list of plugins that the server is running.
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
    data: {
        name: getKey("commands.plugins.name"),
        description: getKey("commands.plugins.description"),
        aliases: [getKey("commands.plugins.aliases.pl")],
        minArg: 0,
        maxArg: 0,
    },

    execute(_server, player) {
        if (CommandVerifier.checkCommand(player, this.data)) {
            return;
        }

        const pluginSet = new Set(PluginManager.plugins);
        const pluginList = Colors.GREEN + [...pluginSet].join(Colors.WHITE + "§7, " + Colors.GREEN) || "";

        player.sendMessage(getKey("commands.plugins.execution.success").replace("%s^1%", `(${pluginSet.size}): ${pluginList || ""} ${Colors.RESET}`));
    },
};
