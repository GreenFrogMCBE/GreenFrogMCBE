/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
/**
 * Returns if debug is enabled or not
 *
 * @returns {boolean}
 */
export function isDebugEnabled(): boolean;
/**
 * Logs a message
 *
 * @throws {LoggingException} - If the log type is invalid (valid are info, warn, error, debug)
 * @throws {LoggingException} - If the log type is 'warning' (common Node.JS mistake) (must be 'warn')
 *
 * @param {string} langString
 * @param {number} color
 * @param {string} message
 * @param {string} consoleType
 *
 *
 */
export function log(langString: string, color: number, message: string, consoleType: string): void;
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
