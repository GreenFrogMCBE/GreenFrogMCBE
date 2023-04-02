const Logger = require("../server/Logger");
const { players } = require("../api/PlayerInfo");
const { lang, config } = require("../api/ServerInfo");

/**
 * @type {import('../base/Command').Command}
 */	
module.exports = {
	runAsConsole(_server, args) {
        let time = args[1];
		switch (time) {
			case "day":
				time = 1000;
				break;
			case "night":
				time = 17000;
				break;
			default:
				time = parseInt(args[1]);
				if (isNaN(time)) {
					Logger.log(lang.commands.usageTime);
					return;
				}
		}

		for (const client of players) {
			client.setTime(time);
		}

		players.forEach((client) => client.setTime(time));
		Logger.log(lang.commands.timeUpdated);
    },

	run(_server, player, args) {
        if (!config.consoleCommandTime) {
			player.sendMessage("§c" + lang.errors.unknownCommand);
			return;
		}

		let time = args[1];
		switch (time) {
			case "day":
				time = 1000;
				break;
			case "night":
				time = 17000;
				break;
			default:
				time = parseInt(args[1]);
				if (isNaN(time)) {
					player.sendMessage("§c" + lang.commands.usageTime);
					return;
				}
		}

		for (const client of players) {
			client.setTime(time);
		}

		player.sendMessage(lang.commands.timeUpdated);
    },

	data: {
		name: "time",
		description: "Time command.",
		minArg: 1,
		maxArg: 1,
	},
};
