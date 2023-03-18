const Logger = require("../Logger");
const { lang, config } = require("../../server/ServerInfo");
const PlayerInfo = require("../../player/PlayerInfo");

/**
 * @type {import('../../base/Command').Command}
 */	
module.exports = {
	runAsConsole(server, args) {
		let msg = lang.commands.sayCommandFormat.replace(`%message%`, args.join(' ')).replace(`%sender%`, "Server");

		for (let i = 0; i < PlayerInfo.players.length; i++) {
			let client = PlayerInfo.players[i];
			client.sendMessage(msg);
		}

		Logger.log(msg);
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
