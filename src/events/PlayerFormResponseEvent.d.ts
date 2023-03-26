export = PlayerFormResponseEvent;
declare class PlayerFormResponseEvent extends Event {
    cancelled: boolean;
    name: string;
    server: any;
    player: any;
    formData: any;
}
import Event = require("./Event");
