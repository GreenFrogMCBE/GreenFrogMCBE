export = PlayerUpdateDifficultyEvent;
declare class PlayerUpdateDifficultyEvent extends Event {
    cancelled: boolean;
    name: string;
    execute(): any;
}
import Event = require("./Event");
