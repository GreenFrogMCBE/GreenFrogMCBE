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

	Frog.event_emitter.emit("playerOpStatusChange", {
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
	 * @param {import("@greenfrog/mc-enums").PossiblyUndefined<string>} username - The username to check.
	 * @returns {Promise<boolean>} - Whether the user is opped.
	 * @async
	 */
	async is_opped(username) {
		const oppedPlayers = fs.readFileSync(Frog.directories.op_file, "utf8")
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

		fs.appendFileSync(Frog.directories.op_file, username + "\n")

		const target = PlayerInfo.get_player(username)

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

		const ops = fs.readFileSync(Frog.directories.op_file, "utf-8")
		const updatedOps = ops
			.split("\n")
			.filter((op) => op !== username)
			.join("\n")

		fs.writeFileSync(Frog.directories.op_file, updatedOps)

		const target = PlayerInfo.get_player(username)

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
	async set_op(username, status) {
		status ? await this.op(username) : await this.deop(username)
	},
}
