const Logger = require("../server/Logger");
const { lang } = require("../api/ServerInfo");
const PlayerInfo = require("../api/PlayerInfo");
const CommandVerifier = require("../utils/CommandVerifier");

/**
 * @type {import('../base/Command').Command}
 */
module.exports = {
	execute(_server, player, args) {
		if (CommandVerifier.checkCommand(player, this.data)) return

		if (!player.op) {
			player.sendMessage("§c" + lang.errors.unknownCommandOrNoPermission)
			return
		}

		args = args[1];

		let msg = lang.commands.sayCommandFormat.replace(`%message%`, args.join(' ')).replace(`%sender%`, player.username);

		for (let i = 0; i < PlayerInfo.players.length; i++) {
			player.sendMessage(msg);
		}

		Logger.info(msg);
	},

	data: {
		name: "say",
		description: "Sends a message in the chat to other players.",
		aliases: [],
		minArg: 1,
		maxArg: 1,
	},
};