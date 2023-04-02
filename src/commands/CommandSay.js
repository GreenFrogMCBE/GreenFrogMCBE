const Logger = require("../server/Logger");
const PlayerInfo = require("../api/PlayerInfo");
const { lang, config } = require("../api/ServerInfo");

/**
 * @type {import('../base/Command').Command}
 */	
module.exports = {
	runAsConsole(_server, args) {
		let msg = lang.commands.sayCommandFormat.replace(`%message%`, args.join(' ')).replace(`%sender%`, "Server");

		PlayerInfo.players.forEach((client) => {
			client.sendMessage(msg);
		});

		Logger.info(msg);
	},

	run(_server, player, args) {
		if (!config.playerCommandSay) {
			player.sendMessage(lang.errors.playerUnknownCommand);
			return;
		}

		if (!player.op) {
			player.sendMessage(lang.errors.noPermission);
			return;
		}

		if (!args[1]) {
			player.sendMessage("§c" + lang.commands.usageSay);
			return;
		}
		args = args[1];

		let msg = lang.commands.sayCommandFormat.replace(`%message%`, args.join(' ')).replace(`%sender%`, player.username);

		for (let i = 0; i < PlayerInfo.players.length; i++) {
			player.sendMessage(msg);
		}

		Logger.log(msg);
	},

	data: {
		name: "say",
		description: "Say command.",
        aliases: ['broadcast'],
		minArg: 1,
		maxArg: 1,
	},
};