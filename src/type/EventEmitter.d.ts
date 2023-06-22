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
import { EventEmitter } from "events";

declare function on(eventName: "blockBreak", listener: (...args: any[]) => void): void;
declare function on(eventName: "packetRead", listener: (...args: any[]) => void): void;
declare function on(eventName: "packetReadError", listener: (...args: any[]) => void): void;
declare function on(eventName: "packetRateLimitReached", listener: (...args: any[]) => void): void;
declare function on(eventName: "packetQueue", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverShutdown", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverTick", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverTimeTick", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverRegenerationTick", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverStarvationDamageTick", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverVoidDamageTick", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverSetDimension", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverGarbageCollection", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverOfflinePlayersGarbageCollection", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverToClientMessage", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverChatAsPlayer", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverGamemodeChange", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverToast", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverCommandProcess", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverCommandProcessError", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverLogMessage", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverSetEntityData", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverUpdateChunkRadius", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverTimeUpdate", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverSetDifficulty", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverExecutedCommand", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverVelocityUpdate", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverSetXP", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverSetHealth", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverCriticalError", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverListen", listener: (...args: any[]) => void): void;
declare function on(eventName: "queryListen", listener: (...args: any[]) => void): void;
declare function on(eventName: "scoreboardCreation", listener: (...args: any[]) => void): void;
declare function on(eventName: "scoreboardSetScore", listener: (...args: any[]) => void): void;
declare function on(eventName: "scoreboardScoreDelete", listener: (...args: any[]) => void): void;
declare function on(eventName: "scoreboardDelete", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerFallDamage", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerRegeneration", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerDeath", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerHungerUpdate", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerHealthUpdate", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerLeave", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerSetAttribute", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerTransfer", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerKick", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerJoin", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerPreConnect", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerContainerOpen", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerContainerClose", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerInteract", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerFormResponse", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerHasAllResourcePacks", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerResourcePacksRefused", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerHasNoResourcePacksInstalled", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerSpawn", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerResourcePacksCompleted", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerChangeGamemodeRequest", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerChat", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerMove", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerMalformatedChatMessage", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerMalformatedChatCommand", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerPreItemStackRequest", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerPostItemStackRequest", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerItemStackRequest", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerExecutedCommand", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerPlayStatus", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerTeleport", listener: (...args: any[]) => void): void;

declare function on(eventName: string, listener: (...args: any[]) => void): void;

declare function once(eventName: string, listener: (...args: any[]) => void): void;
declare function emit(eventName: string): void;

declare function shutdownServer(): void;

declare const isDebug: boolean;
declare const eventEmitter: EventEmitter;

export { on, once, emit, isDebug, eventEmitter, shutdownServer };
