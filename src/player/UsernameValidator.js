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
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const PlayerInfo = require("../api/player/PlayerInfo");

module.exports = {
	doesUsernameMatchesRegex(username) {
		const regex = /^[a-zA-Z0-9]+$/; // Regular expression to match only English letters and numbers

		return regex.test(username);
	},

	/**
	 * Checks if the username is a duplicate.
	 *
	 * @param {string} username - The username to check for duplicates.
	 * @returns {boolean} Returns true if the username is a duplicate, false otherwise.
	 */
	isDuplicate(username) {
		return PlayerInfo.players.filter((player) => player.username && !player.offline === username).length > 0;
	},

	/**
	 * Checks if the username length is valid.
	 *
	 * @param {string} username - The username to check the length for.
	 * @returns {boolean} Returns true if the username length is valid, false otherwise.
	 */
	isUsernameLengthValid(username) {
		return !(username.length > 16 || username.length < 3);
	},

	/**
	 * isDuplicate(username: string), doesUsernameMatchesRegex(username: string), isUsernameLengthValid(username: string) combined
	 *
	 * @param {string} username - The username to check for validity.
	 * @returns {boolean} Returns true if the username is valid, false otherwise.
	 */
	isUsernameValid(username) {
		return !this.isDuplicate(username) && this.isUsernameLengthValid(username) && this.doesUsernameMatchesRegex(username);
	},
};
