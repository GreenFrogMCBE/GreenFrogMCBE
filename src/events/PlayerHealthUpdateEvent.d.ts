export = PlayerHealthUpdateEvent;
declare class PlayerHealthUpdateEvent extends Event {
    cancelled: boolean;
    name: string;
    player: any;
    server: any;
    health: number;
    maxHealth: number;
    minHealth: number;
    modifiers: {};
    attributeName: string;
    execute(): any;
}
import Event = require("./Event");
