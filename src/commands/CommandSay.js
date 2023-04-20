const Logger = require("../server/Logger");

const PlayerInfo = require("../api/player/PlayerInfo");

const { getKey } = require("../utils/Language");

/**
 * Command to send a message in the chat to other players.
 *
 * @type {import('../type/Command').Command}
 */
module.exports = {
	data: {
		name: getKey("commands.say.name"),
		description: getKey("commands.say.description"),
		minArg: 1,
		maxArg: 1,
        requiresOp: true
	},

	execute(_server, player, args) {
		const message = args[0];
		const msg = getKey("chat.format.say")
			.replace(`%s%`, message)
			.replace(`%d%`, player.username);

		for (const p of PlayerInfo.players) {
			p.sendMessage(msg);
		}

		Logger.info(msg);
	},
};