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
export let clients: {};
export let server: any;
export let config: any;
export let lang: any;
/**
 * @private
 */
export declare function _initJson(): any;
/**
 * @private
 */
export declare function _handleCriticalError(err: any): any;
/**
 * @private
 */
export declare function _handlepk(client: any, packetparams: any): any;
/**
 * @private
 */
export declare function _onJoin(client: any, server: any): any;
/**
 * It logs a warning if the config.debug or config.unstable is true.
 * @private
 */
export declare function _initDebug(): any;
/**
 * It loads the config, lang files, and commands, then loads the plugins and starts the server.
 */
export declare function start(): any;
/**
 * @private
 */
export declare function _listen(): void;
/**
 * Shutdowns the server.
 */
export declare function shutdown(): any;
