export = PlayerChatEvent;
declare class PlayerChatEvent extends Event {
    cancelled: boolean;
    name: string;
    message: any;
    player: any;
    server: any;
    execute(): any;
}
import Event = require("./Event");
