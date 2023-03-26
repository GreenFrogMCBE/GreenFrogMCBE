export = PlayerLeaveEvent;
declare class PlayerLeaveEvent extends Event {
    name: string;
    player: any;
    server: any;
}
import Event = require("./Event");
