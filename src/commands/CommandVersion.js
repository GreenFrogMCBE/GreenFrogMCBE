const { lang, serverversion } = require('../api/ServerInfo');
const CommandVerifier = require('../utils/CommandVerifier');

/**
 * @type {import('../base/Command').Command}
 */
module.exports = {
	execute(_server, player) {
		if (CommandVerifier.checkCommand(player, this.data)) return

		player.sendMessage(`§7${lang.commands.verInfo.replace('%version%', serverversion)}`);
	},

	data: {
		name: 'version',
		description: 'Shows the server version',
		aliases: ['ver'],
		minArg: 0,
		maxArg: 0,
	},
};