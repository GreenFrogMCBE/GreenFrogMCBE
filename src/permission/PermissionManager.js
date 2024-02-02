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
const PlayerInfo = require("../player/PlayerInfo")

const Frog = require("../Frog")

const fs = require("fs")

/**
 * Emits the `playerOpStatusChange` event
 *
 * @param {string} username
 * @param {boolean} opped
 * @returns {boolean} - Was the event executed successfully?
 * @private
 */
function emitPlayerOpStatusChange(username, opped) {
	let shouldOp = true

	Frog.eventEmitter.emit("playerOpStatusChange", {
		username,
		opped,
		cancel: () => {
			shouldOp = false
		},
	})

	return shouldOp
}

module.exports = {
	/**
	 * Checks if a user is opped.
	 *
	 * @param {string} username - The username to check.
	 * @returns {Promise<boolean>} - Whether the user is opped.
	 * @async
	 */
	async isOpped(username) {
		const oppedPlayers = fs.readFileSync(Frog.directories.opFile, "utf8")
			.split("\n")

		return oppedPlayers.includes(username)
	},

	/**
	 * Gives operator permissions to a player.
	 *
	 * @param {string} username - The username of the player to give the operator permissions to.
	 * @returns {Promise<void>}
	 * @async
	 */
	async op(username) {
		if (!emitPlayerOpStatusChange(username, true)) return

		fs.appendFileSync(Frog.directories.opFile, username + "\n")

		const target = PlayerInfo.getPlayer(username)

		if (target) {
			target.permissions.op = true
		}
	},

	/**
	 * Revokes the operator permissions from a player.
	 *
	 * @param {string} username - The username of the player to remove the operator permissions from.
	 * @returns {Promise<void>}
	 * @async
	 */
	async deop(username) {
		if (!emitPlayerOpStatusChange(username, false)) return

		const ops = fs.readFileSync(Frog.directories.opFile, "utf-8")
		const updatedOps = ops
			.split("\n")
			.filter((op) => op !== username)
			.join("\n")

		fs.writeFileSync(Frog.directories.opFile, updatedOps)

		const target = PlayerInfo.getPlayer(username)

		if (target) {
			target.permissions.op = false
		}
	},

	/**
	 * Gives or revokes operator permissions from a player
	 *
	 * @param {string} username - The username to give or remove the operator status from
	 * @param {boolean} status - The operator status. true to give the operator permissions, false to remove them
	 * @returns {Promise<void>}
	 */
	async setOp(username, status) {
		status ? await this.op(username) : await this.deop(username)
	},
}
