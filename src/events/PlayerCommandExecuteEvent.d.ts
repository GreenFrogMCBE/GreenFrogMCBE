export = PlayerCommandExecuteEvent;
declare class PlayerCommandExecuteEvent extends Event {
    cancelled: boolean;
    name: string;
    server: any;
    player: any;
    command: any;
    execute(): any;
}
import Event = require("./Event");
