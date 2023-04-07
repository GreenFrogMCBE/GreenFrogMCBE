export = PluginChatAsPlayerEvent;
declare class PluginChatAsPlayerEvent extends Event {
    name: string;
    server: any;
    player: any;
    message: any;
    cancelled: boolean;
    execute(): any;
}
import Event = require("./Event");
