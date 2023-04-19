const Logger = require("../server/Logger");

const PlayerInfo = require("../api/player/PlayerInfo");

const CommandVerifier = require("../utils/CommandVerifier");

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
	},

	execute(_server, player, args) {
		if (CommandVerifier.checkCommand(player, this.data) || !player.op) {
			return;
		}

		if (!player.op) {
            player.sendMessage(getKey("commands.unknown"));
            return;
        }

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