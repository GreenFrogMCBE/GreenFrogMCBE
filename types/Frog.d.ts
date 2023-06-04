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
 * Event emitter
 *
 * @private
 * @returns {EventEmitter}
 */
declare const _eventEmitter: eventLib;
import eventLib = require("events");
export declare let isDebug: any;
/**
 * Returns the server object
 *
 * @returns {Server}
 */
export declare function getServer(): Server;
export declare function setServer(server: any): void;
export declare let serverConfigurationFiles: any;
export { _eventEmitter as eventEmitter };
/**
 * Sends message to all players
 *
 * @param {string} message
 */
export declare function broadcastMessage(message: string): void;
/**
 * Shutdowns the server correctly
 * Also its calls onShutdown() in every
 * single plugin that is loaded
 *
 * @param {string} shutdownMessage
 */
export declare function shutdownServer(shutdownMessage?: string): Promise<void>;
export declare let __playercount: number;
/** Adds player to player count. Do not use this in your plugin, please */
export declare function __addPlayer(): void;
/** Removes player from player count. Do not use this in your plugin, please */
export declare function __deletePlayer(): void;
