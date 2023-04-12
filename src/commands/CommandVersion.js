const Frog = require("../Frog")
const CommandVerifier = require('../utils/CommandVerifier');

/**
 * @type {import('../type/Command').Command}
 */
module.exports = {
	execute(_server, player) {
		if (CommandVerifier.checkCommand(player, this.data)) return

		player.sendMessage(`§7${Frog.getConfigs().lang.commands.verInfo.replace('%version%', Frog.getServerData().minorServerVersion)}`);
	},

	data: {
		name: 'version',
		description: 'Shows the server version',
		aliases: ['ver'],
		minArg: 0,
		maxArg: 0,
	},
};