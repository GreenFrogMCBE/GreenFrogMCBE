export = PlayerHealthUpdateEvent;
declare class PlayerHealthUpdateEvent extends Event {
    cancelled: boolean;
    name: string;
    player: any;
    server: any;
    health: any;
    maxHealth: any;
    minHealth: any;
    modifiers: {};
    attributeName: any;
    cause: string;
    execute(): any;
}
import Event = require("./Event");
