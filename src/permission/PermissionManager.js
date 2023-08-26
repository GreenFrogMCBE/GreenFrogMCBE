/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const PlayerInfo = require("../player/PlayerInfo");

const Frog = require("../Frog");

const fs = require("fs");

module.exports = {
	/**
	 * Checks if a user is opped.
	 *
	 * @param {string} username - The username to check.
	 * @returns {Promise<boolean>} - Whether the user is opped.
	 */
	async isOpped(username) {
		const oppedPlayers = fs.readFileSync("ops.yml", "utf8").split("\n");

		for (const oppedPlayer of oppedPlayers) {
			if (oppedPlayer === username) {
				return true;
			}
		}

		return false;
	},

	/**
	 * Changes the op status of a player.
	 *
	 * @param {string} username - The username of the player.
	 * @param {boolean} status - The new op status (true for op, false for deop).
	 * @returns {Promise<void>}
	 */
	async setOpStatus(username, status) {
		let shouldOp = true;

		Frog.eventEmitter.emit("playerOpStatusChange", {
			username,
			status,
			cancel: () => {
				shouldOp = false;
			},
		});

		if (!shouldOp) return;

		if (status) {
			fs.appendFileSync("ops.yml", username + "\n");
		} else {
			const ops = fs.readFileSync("ops.yml", "utf-8");
			const updatedOps = ops
				.split("\n")
				.filter((op) => op !== username)
				.join("\n");

			fs.writeFileSync("ops.yml", updatedOps);
		}

		const target = PlayerInfo.getPlayer(username);

		if (target) {
			target.permissions.op = status;
		}
	},
};
