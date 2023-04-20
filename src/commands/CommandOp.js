const fs = require("fs").promises;

const { get: getPlayerInfo } = require("../api/player/PlayerInfo");

const { getKey } = require("../utils/Language");

module.exports = {
	data: {
		name: getKey("commands.op.name"),
		description: getKey("commands.op.description"),
		minArgs: 1,
		maxArgs: 1,
		requiresOp: true
	},

	async execute(_server, player, args) {
		const playerName = args[0];

		try {
			await fs.appendFile("ops.yml", playerName + "\n");

			try {
				getPlayerInfo(playerName).op = true;
			} catch { /** player is offline */ }

			player.sendMessage(getKey("commands.op.execution.success").replace("%s%", playerName));
		} catch {
			player.sendMessage(getKey("commands.op.execution.failed").replace("%s%", playerName));
		}
	}
};