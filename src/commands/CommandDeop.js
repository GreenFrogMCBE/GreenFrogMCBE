const fs = require("fs").promises;

const { get: getPlayerInfo } = require("../api/player/PlayerInfo");

const { getKey } = require("../utils/Language");

module.exports = {
	data: {
		name: getKey("commands.deop.name"),
		description: getKey("commands.deop.description"),
		minArgs: 1,
		requiresOp: true,
	},

	async execute(_server, player, args) {
		const playerName = args[0];

		try {
			const ops = await fs.readFile("ops.yml", "utf-8");
			const updatedOps = ops
				.split("\n")
				.filter((op) => op !== playerName)
				.join("\n");

			await fs.writeFile("ops.yml", updatedOps);

			try {
				getPlayerInfo(playerName).op = false;
			} catch {
				/** player is offline */
			}

			player.sendMessage(getKey("commands.deop.execution.success").replace("%s%", playerName));
		} catch {
			player.sendMessage(getKey("commands.deop.execution.fail").replace("%s%", player));
		}
	},
};
