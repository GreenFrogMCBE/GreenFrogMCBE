export = PlayerSpawnEvent;
declare class PlayerSpawnEvent extends Event {
    cancelled: boolean;
    name: string;
    player: any;
    server: any;
    time: number;
}
import Event = require("./Event");
