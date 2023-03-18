const Logger = require("../Logger");
const { lang, config, serverversion } = require("../../server/ServerInfo");

/**
 * @type {import('../../base/Command').Command}
 */	
module.exports = {
	runAsConsole() {
		if (!config.consoleCommandVersion) {
			Logger.log(lang.errors.unknownCommand);
			return;
		}

		Logger.log(lang.commands.verInfo.replace("%version%", serverversion));
	},

	run(_server, player) {
		player.sendMessage("§7" + lang.commands.verInfo.replace("%version%", serverversion));
	},

	data: {
		name: "version",
		description: "Version command.",
        aliases: ['ver'],
		minArg: 0,
		maxArg: 0,
	},
};
