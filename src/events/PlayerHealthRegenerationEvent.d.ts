export = PlayerHealthUpdateEvent;
declare class PlayerHealthUpdateEvent extends Event {
    name: string;
    player: any;
    server: any;
    /**
     * @deprecated Please use PlayerHealthUpdateEvent
     */
    execute(): any;
}
import Event = require("./Event");
