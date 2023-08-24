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
const PlayerInfo = require("./PlayerInfo");

module.exports = {
	/**
	 * Checks if the usernames matches the regex. The regex is `/^[a-zA-Z0-9 ]+$/`
	 *
	 * @param {string} username - The username to check for duplicates.
	 * @returns {boolean} Returns true if the username is a duplicate, false otherwise.
	 */
	doesUsernameMatchRegex(username) {
		const regex = /^[a-zA-Z0-9 ]+$/; // Regular expression to match only English letters, spaces and numbers

		return regex.test(username);
	},

	/**
	 * Checks if a player with the same username is online on the server.
	 *
	 * @param {string} username - The username to check for duplicates.
	 * @returns {boolean} Returns true if the username is a duplicate, false otherwise.
	 */
	isDuplicate(username) {
		return PlayerInfo.playersOnline.filter((player) => player.username && player.username == username).length > 0;
	},

	/**
	 * Returns `true` if the username is longer than 16 characters or shorter than 3 characters
	 *
	 * @param {string} username - The username to check the length for.
	 * @returns {boolean} Returns true if the username length is valid, false otherwise.
	 */
	isUsernameLengthValid(username) {
		return !(username.length > 16 || username.length < 3);
	},

	/**
	 * isDuplicate(username: string), doesUsernameMatchRegex(username: string), isUsernameLengthValid(username: string) combined
	 *
	 * @param {string} username - The username to check for validity.
	 * @returns {boolean} Returns true if the username is valid, false otherwise.
	 */
	isUsernameValid(username) {
		return !this.isDuplicate(username) && this.isUsernameLengthValid(username) && this.doesUsernameMatchRegex(username);
	},
};
