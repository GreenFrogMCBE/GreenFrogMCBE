export = ServerToClientChatEvent;
declare class ServerToClientChatEvent extends Event {
    cancelled: boolean;
    name: string;
    server: any;
    player: any;
    message: any;
    execute(): any;
}
import Event = require("./Event");
