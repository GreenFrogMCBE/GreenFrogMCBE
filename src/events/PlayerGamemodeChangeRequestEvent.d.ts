export = PlayerGamemodeChangeRequestEvent;
declare class PlayerGamemodeChangeRequestEvent extends Event {
    cancelled: boolean;
    name: string;
    server: any;
    player: any;
    gamemode: any;
    execute(): any;
}
import Event = require("./Event");
