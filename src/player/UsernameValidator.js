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
const PlayerInfo = require("./PlayerInfo")

module.exports = {
	/**
	 * @type {RegExp}
	 */
	regex: /^[a-zA-Z0-9 ]+$/,

	/**
	 * Checks if the usernames matches the regex. The regex is `/^[a-zA-Z0-9 ]+$/`
	 *
	 * @param {string} username - The username to check for duplicates.
	 * @returns {boolean} Returns true if the username is a duplicate, false otherwise.
	 */
	does_username_match_regex(username) {
		return this.regex.test(username)
	},

	/**
	 * Checks if a player with the same username is online on the server.
	 *
	 * @param {string} username - The username to check.
	 * @returns {boolean}
	 */
	is_duplicate(username) {
		return PlayerInfo.players_online
			.filter(
				(player) => player.username &&
				player.username == username
			)
			.length > 0
	},

	/**
	 * Returns `true` if the username is longer than 16 characters or shorter than 3 characters
	 *
	 * @param {string} username - The username to check.
	 * @returns {boolean}
	 */
	is_username_length_valid(username) {
		return !(
			username.length > 16 ||
			username.length < 3
		)
	},

	/**
	 * is_duplicate(username: string), does_username_match_regex(username: string), is_username_length_valid(username: string) combined
	 *
	 * @param {string} username - The username to check.
	 * @returns {boolean}
	 */
	is_username_valid(username) {
		return !this.is_duplicate(username)
			&& this.is_username_length_valid(username)
			&& this.does_username_match_regex(username)
	},
}
