export = PlayerKickEvent;
declare class PlayerKickEvent extends Event {
    name: string;
    reason: any;
    server: any;
    player: any;
}
import Event = require("./Event");
