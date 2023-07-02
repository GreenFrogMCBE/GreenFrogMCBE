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
export function doesUsernameMatchesRegex(username: any): boolean;
/**
 * Checks if the username is a duplicate.
 *
 * @param {string} username - The username to check for duplicates.
 * @returns {boolean} Returns true if the username is a duplicate, false otherwise.
 */
export function isDuplicate(username: string): boolean;
/**
 * Checks if the username length is valid.
 *
 * @param {string} username - The username to check the length for.
 * @returns {boolean} Returns true if the username length is valid, false otherwise.
 */
export function isUsernameLengthValid(username: string): boolean;
/**
 * isDuplicate(username: string), doesUsernameMatchesRegex(username: string), isUsernameLengthValid(username: string) combined
 *
 * @param {string} username - The username to check for validity.
 * @returns {boolean} Returns true if the username is valid, false otherwise.
 */
export function isUsernameValid(username: string): boolean;
