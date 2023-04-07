export = PlayerConnectionCreateEvent;
declare class PlayerConnectionCreateEvent extends Event {
    cancelled: boolean;
    name: string;
    player: any;
    server: any;
}
import Event = require("./Event");
