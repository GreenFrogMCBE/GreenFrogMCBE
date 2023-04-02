const { lang, config, serverversion } = require('../api/ServerInfo');

/**
 * @type {import('../base/Command').Command}
 */
module.exports = {
	throwError(player) {
		player.sendMessage(lang.errors.unknownCommandOrNoPermission.replace('%commandname%', this.data.name));
	},

	execute(_server, player) {
		if (player.isConsole && !config.consoleCommandVersion) {
			this.throwError(player);
			return;
		}

		player.sendMessage(`§7${lang.commands.verInfo.replace('%version%', serverversion)}`);
	},

	data: {
		name: 'version',
		description: 'Version command.',
		aliases: ['ver'],
		minArg: 0,
		maxArg: 0,
	},
};