const Frog = require("../Frog");

const CommandVerifier = require('../utils/CommandVerifier');

const Colors = require("../api/colors/Colors");
/**
 * @type {import('../type/Command').Command}
 */
module.exports = {
	data: {
		name: 'version',
		description: 'Shows the server version.',
		aliases: ['ver', 'about'],
		minArg: 0,
		maxArg: 0,
	},

	execute(_server, player) {
		if (CommandVerifier.checkCommand(player, this.data)) {
			return;
		}

		const versionMsg = Frog.serverConfigurationFiles.lang.commands.verInfo.replace('%version%', Frog.getServerData().minorServerVersion);
		player.sendMessage(`${Colors.GRAY}${versionMsg}`);
	}
};
