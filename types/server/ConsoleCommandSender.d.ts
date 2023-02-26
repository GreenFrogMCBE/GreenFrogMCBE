declare class ConsoleCommandExecutedEvent {
  //  TODO: replace any with something else
  execute(server: any, data: string): void;
}

declare let isclosed: boolean;
export declare const closed: boolean;

export declare function close(): void;
export declare function start(): Promise<void>;