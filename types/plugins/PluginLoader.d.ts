/** @private @type {number} */
export let pluginCount: number;
/** @private @type {JSON} */
export const directories: JSON;
/**
 * Loads all plugins
 */
export declare function loadPlugins(): Promise<void>;
/**
 * Kills the server
 */
export declare function killServer(): Promise<void>;
/**
 * Prepares plugins for shutdown
 */
export declare function initPluginShutdown(): void;
/**
 * Unloads plugins
 */
export declare function unloadPlugins(): Promise<void>;
