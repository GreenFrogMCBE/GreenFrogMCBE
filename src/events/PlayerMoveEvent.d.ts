export = PlayerMoveEvent;
declare class PlayerMoveEvent extends Event {
    cancelled: boolean;
    name: string;
    position: any;
    server: any;
    player: any;
    execute(): any;
}
import Event = require("./Event");
