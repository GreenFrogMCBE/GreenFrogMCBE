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
/**
 * Returns all messages in console as an array
 * @returns {Array<String>}
 */
export function getMessageLogs(): string[];
/**
 * Changes the contents of the `messageLogs` array
 * @param {Array<String>} newMessageLogs
 */
export function setMessageLogs(newMessageLogs: string[]): void;
/**
 * Clears the message logs
 */
export function clearMessageLogs(): void;
/**
 * Logs a message
 *
 * @throws {LoggingException} - If the log type is invalid (valid are info, warn, error, debug)
 * @throws {LoggingException} - If the log type is 'warning' (common NodeJS mistake) (must be 'warn')
 *
 * @param {string} langString
 * @param {number} color
 * @param {string} message
 * @param {string} type
 */
export function log(langString: string, color: number, message: string, type: string): void;
/**
 * Logs a message to the console as info
 *
 * @param {string} message
 */
export function info(message: string): void;
/**
 * Logs a message to the console as warning
 *
 * @param {string} message
 *
 */
export function warning(message: string): void;
/**
 * Logs a message to the console as error
 *
 * @param {string} message
 *
 */
export function error(message: string): void;
/**
 * Logs a message to the console as debug
 * Requires for debug to be enabled in the server settings
 *
 * @param {string} message
 *
 */
export function debug(message: string): void;
