export = PlayerHasAllResourcePacksEvent;
declare class PlayerHasAllResourcePacksEvent extends Event {
    cancelled: boolean;
    name: string;
    player: any;
    server: any;
    resourcePacksIds: {};
    resourcePacksRequired: boolean;
    cancel(client: any): void;
}
import Event = require("./Event");
