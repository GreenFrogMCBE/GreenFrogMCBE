const CommandVerifier = require("../utils/CommandVerifier");
const PluginManager = require('../plugins/PluginManager');
const Colors = require("../api/colors/Colors");
const { serverConfigurationFiles } = require("../Frog");
const { lang } = serverConfigurationFiles;

/**
 * Command to show list of plugins that the server is running.
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
    data: {
        name: "plugins",
        description: "Shows list of plugins that the server is running.",
        aliases: ['pl'],
        minArg: 0,
        maxArg: 0,
    },

    execute(_server, player) {
        if (CommandVerifier.checkCommand(player, this.data)) {
            return;
        }

        const pluginSet = new Set(PluginManager.plugins);
        const pluginList = Colors.GREEN + [...pluginSet].join(Colors.WHITE + "§7, " + Colors.GREEN) || "";

        player.sendMessage(`${lang.commands.plugins} (${pluginSet.size}): ${pluginList || ""} ${Colors.RESET}`);
    },
};
