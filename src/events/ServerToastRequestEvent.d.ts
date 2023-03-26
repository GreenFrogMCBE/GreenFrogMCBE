export = ServerToastRequestEvent;
declare class ServerToastRequestEvent extends Event {
    cancelled: boolean;
    name: string;
    title: any;
    player: any;
    message: any;
    execute(): any;
}
import Event = require("./Event");
