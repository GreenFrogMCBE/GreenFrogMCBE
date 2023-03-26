export = GarbageOfflinePlayerCollectorEvent;
declare class GarbageOfflinePlayerCollectorEvent extends Event {
    name: string;
    server: any;
    execute(): any;
}
import Event = require("./Event");
