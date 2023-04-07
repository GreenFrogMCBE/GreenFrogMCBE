export = GarbageCollectionEvent;
declare class GarbageCollectionEvent extends Event {
    name: string;
    server: any;
    execute(): any;
}
import Event = require("./Event");
