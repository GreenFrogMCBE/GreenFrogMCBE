export = PlayerHasNoResourcePacksInstalledEvent;
declare class PlayerHasNoResourcePacksInstalledEvent extends Event {
    name: string;
    cancelled: boolean;
    player: any;
    server: any;
    resourcePacksIds: {};
    resourcePacksRequired: boolean;
    cancel(client: any): void;
}
import Event = require("./Event");
