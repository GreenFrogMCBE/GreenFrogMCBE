const { players } = require("../api/player/PlayerInfo");
const CommandVerifier = require("../utils/CommandVerifier");

const { serverConfigurationFiles } = require("../Frog");
const { lang } = serverConfigurationFiles;

/**
 * @type {import('../type/Command').Command}
 */
module.exports = {
	execute(_server, player, args) {
		if (CommandVerifier.checkCommand(player, this.data)) {
			return;
		}

		const time = args[1];
		const setTime = time === "day" ? 1000 : time === "night" ? 17000 : parseInt(time, 10);

		if (!Number.isInteger(setTime)) {
			player.sendMessage(lang.errors.badType);
			return;
		}

		for (const client of players) {
			client.setTime(time);
		}

		player.sendMessage(lang.commands.timeUpdated);
	},

	data: {
		name: "time",
		description: "Changes the world's time.",
		minArg: 1,
		maxArg: 1,
	},
};
