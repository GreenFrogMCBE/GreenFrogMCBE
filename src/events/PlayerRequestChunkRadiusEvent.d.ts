export = PlayerRequestChunkRadiusEvent;
declare class PlayerRequestChunkRadiusEvent extends Event {
    cancelled: boolean;
    name: string;
    server: any;
    player: any;
    radius: any;
    execute(): any;
}
import Event = require("./Event");
