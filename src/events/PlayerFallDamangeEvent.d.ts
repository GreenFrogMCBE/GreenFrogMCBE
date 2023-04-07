export = PlayerFallDamangeEvent;
declare class PlayerFallDamangeEvent extends Event {
    name: string;
    player: any;
    server: any;
}
import Event = require("./Event");
