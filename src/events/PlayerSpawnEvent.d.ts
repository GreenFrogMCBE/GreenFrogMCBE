export = PlayerSpawnEvent;
declare class PlayerSpawnEvent extends Event {
    cancelled: boolean;
    name: string;
    player: any;
    server: any;
    cancel(client: any): void;
}
import Event = require("./Event");
