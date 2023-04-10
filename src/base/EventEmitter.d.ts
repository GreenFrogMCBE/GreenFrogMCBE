import { EventEmitter } from 'events';

declare function on(eventName: "packetRead", listener: (...args: any[]) => void): void;
declare function on(eventName: "packetReadError", listener: (...args: any[]) => void): void;
declare function on(eventName: "packetRateLimitReached", listener: (...args: any[]) => void): void;
declare function on(eventName: "packetQueue", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerConnect", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerPreConnect", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerMaxPlayersDisconnect", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerVersionMismatchDisconnect", listener: (...args: any[]) => void): void;
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
declare function on(eventName: "serverCommandPreProcess", listener: (...args: any[]) => void): void;
declare function on(eventName: string, listener: (...args: any[]) => void): void;

export {
  on,
  eventEmitter,
};