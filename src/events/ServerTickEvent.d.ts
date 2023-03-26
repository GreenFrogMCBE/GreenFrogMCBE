export = ServerTickEvent;
declare class ServerTickEvent extends Event {
    name: string;
    server: any;
    world: any;
    execute(): any;
}
import Event = require("./Event");
