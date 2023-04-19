const Frog = require("../Frog");

const CommandVerifier = require('../utils/CommandVerifier');

const Colors = require("../api/colors/Colors");
const { getKey } = require("../utils/Language");

/**
 * @type {import('../type/Command').Command}
 */
module.exports = {
	data: {
		name: getKey("commands.version.name"),
		description: getKey("commands.version.description"),
		aliases: [getKey("commands.version.aliases.ver"), getKey("commands.version.aliases.about")],
		minArg: 0,
		maxArg: 0,
	},

	execute(_server, player) {
		if (CommandVerifier.checkCommand(player, this.data)) {
			return;
		}

		const versionMsg = getKey("frog.version").replace('%s%', Frog.getServerData().minorServerVersion);
		player.sendMessage(`${Colors.GRAY}${versionMsg}`);
	}
};
