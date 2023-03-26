export = PlayerResourcePacksRefusedEvent;
declare class PlayerResourcePacksRefusedEvent extends Event {
    name: string;
    cancelled: boolean;
    server: any;
    player: any;
    cancel(client: any): void;
}
import Event = require("./Event");
