const Logger = require("../server/Logger");
const PlayerInfo = require("../api/player/PlayerInfo");
const CommandVerifier = require("../utils/CommandVerifier");

const { serverConfigurationFiles } = require("../Frog");
const { lang } = serverConfigurationFiles;

/**
 * Command to send a message in the chat to other players.
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
	data: {
		name: "say",
		description: "Sends a message in the chat to other players.",
		aliases: [],
		minArg: 1,
		maxArg: 1,
	},

	execute(_server, player, args) {
		if (CommandVerifier.checkCommand(player, this.data) || !player.op) {
			return;
		}

		const message = args[0];
		const msg = lang.commands.sayCommandFormat
			.replace(`%message%`, message)
			.replace(`%sender%`, player.username);

		for (const p of PlayerInfo.players) {
			p.sendMessage(msg);
		}

		Logger.info(msg);
	},
};