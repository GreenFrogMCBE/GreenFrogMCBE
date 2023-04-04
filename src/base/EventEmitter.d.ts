import { EventEmitter } from 'events';

declare function on(eventName: "packetRead", listener: (...args: any[]) => void): void;
declare function on(eventName: "packetReadError", listener: (...args: any[]) => void): void;
declare function on(eventName: "packetRateLimitReached", listener: (...args: any[]) => void): void;
declare function on(eventName: "packetQueueEvent", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerConnect", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerPreConnectEvent", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerMaxPlayersDisconnect", listener: (...args: any[]) => void): void;
declare function on(eventName: "playerVersionMismatchDisconnect", listener: (...args: any[]) => void): void;
declare function on(eventName: "serverShutdownEvent", listener: (...args: any[]) => void): void;
declare function on(eventName: string, listener: (...args: any[]) => void): void;

declare const isDebug: boolean;
declare const eventEmitter: EventEmitter;

export {
  on,
  isDebug,
  eventEmitter
};
