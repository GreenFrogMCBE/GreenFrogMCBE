export = ServerInternalServerErrorEvent;
declare class ServerInternalServerErrorEvent extends Event {
    name: string;
    server: any;
    error: any;
    execute(): any;
}
import Event = require("./Event");
