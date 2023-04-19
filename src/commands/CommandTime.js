const { players } = require("../api/player/PlayerInfo");

const CommandVerifier = require("../utils/CommandVerifier");
const { getKey } = require("../utils/Language");

/**
 * @type {import('../type/Command').Command}
 */
module.exports = {
	data: {
		name: getKey("commands.time.name"),
		description: getKey("commands.time.description"),
		minArg: 1,
		maxArg: 1,
        requiresOp: true
	},

	execute(_server, player, args) {
		if (CommandVerifier.checkCommand(player, this.data )) { return; }

		const time = args[1];
		const setTime = time === getKey("commands.time.times.day") ? 1000 : time === getKey("commands.time.times.night") ? 17000 : parseInt(time, 10);

		if (!Number.isInteger(setTime)) {
			player.sendMessage(getKey("commands.time.execution.failed"));
			return;
		}

		for (const client of players) {
			client.setTime(time);
		}

		player.sendMessage(getKey("commands.time.execution.success").replace("%s%", time));
	}
};
