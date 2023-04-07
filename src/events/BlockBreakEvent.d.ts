export = BlockBreakEvent;
declare class BlockBreakEvent extends Event {
    name: string;
    legacy: any;
    actions: any;
    transaction_type: any;
    transaction_data: any;
    player: any;
    server: any;
    block_position: any;
    cancelled: boolean;
}
import Event = require("./Event");
