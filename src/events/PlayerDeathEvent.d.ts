export = PlayerDeathEvent;
declare class PlayerDeathEvent extends Event {
    name: string;
    player: any;
    server: any;
    cancelled: boolean;
}
import Event = require("./Event");
