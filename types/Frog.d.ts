/**
 * Event emitter
 *
 * @private
 * @returns {EventEmitter}
 */
declare const _eventEmitter: eventLib;
import eventLib = require("events");
export declare const isDebug: any;
/**
 * Returns the server object
 *
 * @returns {Server}
 */
export declare function getServer(): Server;
export declare function setServer(server: any): void;
export declare const serverConfigurationFiles: any;
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
export declare const __playercount: number;
/** Adds player to player count. Do not use this in your plugin, please */
export declare function __addPlayer(): void;
/** Removes player from player count. Do not use this in your plugin, please */
export declare function __deletePlayer(): void;
