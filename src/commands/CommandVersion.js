const Frog = require("../Frog");
const CommandVerifier = require('../utils/CommandVerifier');

/**
 * @type {import('../type/Command').Command}
 */
module.exports = {
	execute(_server, player) {
		if (CommandVerifier.checkCommand(player, this.data)) {
			return;
		}

		const versionMsg = Frog.serverConfigurationFiles.lang.commands.verInfo.replace('%version%', Frog.getServerData().minorServerVersion);
		player.sendMessage(`§7${versionMsg}`);
	},

	data: {
		name: 'version',
		description: 'Shows the server version',
		aliases: ['ver', 'about'],
		minArg: 0,
		maxArg: 0,
	},
};
