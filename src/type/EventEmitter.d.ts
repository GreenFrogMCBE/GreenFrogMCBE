import { EventEmitter } from 'events';

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
declare function on(eventName: "serverGarbageCollection", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverOfflinePlayersGarbageCollection", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverToClientMessage", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverChatAsPlayer", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverGamemodeChange", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverCommandProcess", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverCommandProcessError", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverLogMessage", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverSetEntityData", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverUpdateChunkRadius", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverTimeUpdate", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverSetDifficulty", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerSetAttribute", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerTransferEvent", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerKickEvent", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerConnect", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerPreConnect", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerMaxPlayersDisconnect", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerVersionMismatchDisconnect", listener: (...args: any[]) => void): void;

//serverTimeUpdate

declare function on(eventName: string, listener: (...args: any[]) => void): void;

declare function once(eventName: string, listener: (...args: any[]) => void): void;
declare function emit(eventName: string): void;

declare function shutdownServer(): void;

declare const isDebug: boolean;
declare const eventEmitter: EventEmitter;

export {
  on,
  once,
  emit,
  isDebug,
  eventEmitter,
  shutdownServer,
};
