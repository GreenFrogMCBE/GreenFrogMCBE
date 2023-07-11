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
 * @link Github - https://github.com/aboxofrats/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Frog = require("../../Frog");

const { get } = require("../player/PlayerInfo");

const fs = require("fs");

module.exports = {
	/**
	 * Returns if the user is opped.
	 *
	 * @param {string} username - The username of the user to check.
	 * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating whether the user is opped or not.
	 */
	async isOpped(username) {
		const ops = fs.readFileSync("ops.yml", "utf8").split("\n");

		if (ops.includes(username)) {
			return true;
		}

		return false;
	},

	/**
	 * Changes the op status of a user.
	 *
	 * @param {string} username - The username of the user to change the op status for.
	 * @param {boolean} op - The new op status to set (true for op, false for deop).
	 * @returns {Promise<void>} A Promise that resolves when the op status has been changed.
	 */
	async changeOpStatus(username, op) {
		let shouldOp = true;

		Frog.eventEmitter.emit("playerOfflineOpStatusChange", {
			username,
			cancel: () => {
				shouldOp = false;
			},
		});

		if (!shouldOp) return;

		if (op) await fs.appendFile("ops.yml", username + "\n");
		else {
			const ops = await fs.readFile("ops.yml", "utf-8");
			const updatedOps = ops
				.split("\n")
				.filter((op) => op !== username)
				.join("\n");

			await fs.writeFile("ops.yml", updatedOps);
		}

		get(username).op = op;
	},
};
