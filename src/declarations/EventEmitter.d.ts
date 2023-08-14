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
import { EventEmitter } from "aboshEvents";

declare function on(eventName: "aboshContainerOpen", listener: (...args: any[]) => void): void;
declare function on(eventName: "aboshOpStatusChange", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerOfflineOpStatusChange", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerContainerClose", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerInteract", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerFormResponse", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerHasAllTheResourcePacks", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerResourcePacksRefused", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerHasNoResourcePacksInstalled", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerSpawn", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerResourcePacksCompleted", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerChangeGamemodeRequest", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerChat", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerMove", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerMalformatedChatMessage", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerMalformatedChatCommand", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerItemStackRequest", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerExecutedCommand", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerPlayStatus", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerTeleport", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerKill", listener: (...args: any[]) => void): void;

declare function on(eventName: string, listener: (...args: any[]) => void): void;

declare function once(eventName: string, listener: (...args: any[]) => void): void;
declare function emit(eventName: string): void;

declare function shutdownServer(): void;

declare const isDebug: boolean;
declare const eventEmitter: EventEmitter;

export { on, once, emit, isDebug, eventEmitter, shutdownServer };
