export = PlayerSentInvalidMessageEvent;
declare class PlayerSentInvalidMessageEvent {
    name: string;
    cancelled: boolean;
    message: any;
    player: any;
    server: any;
    cancel(): void;
    execute(): any;
}
