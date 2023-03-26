export = BlockBreakEvent;
declare class BlockBreakEvent extends Event {
    name: string;
    legacy: {};
    actions: {};
    transaction_type: string;
    transaction_data: {};
    player: any;
    server: any;
}
import Event = require("./Event");
