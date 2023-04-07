export = PlayerResourcePacksCompletedEvent;
declare class PlayerResourcePacksCompletedEvent extends Event {
    cancelled: boolean;
    name: string;
    player: any;
    server: any;
}
import Event = require("./Event");
