export = PlayerTransferEvent;
declare class PlayerTransferEvent extends Event {
    cancelled: boolean;
    name: string;
    server: any;
    player: any;
    address: any;
    port: any;
    execute(): any;
}
import Event = require("./Event");
