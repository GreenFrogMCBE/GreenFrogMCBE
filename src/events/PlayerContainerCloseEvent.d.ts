export = PlayerContainerCloseEvent;
declare class PlayerContainerCloseEvent extends Event {
    name: string;
    server: any;
    player: any;
    isRequestByServer: boolean;
    windowID: number;
    cancelled: boolean;
    execute(): any;
}
import Event = require("./Event");
