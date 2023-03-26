export = ServerConsoleCommandExecutedEvent;
declare class ServerConsoleCommandExecutedEvent extends Event {
    cancelled: boolean;
    name: string;
    server: any;
    command: any;
    execute(): any;
}
import Event = require("./Event");
