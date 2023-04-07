export = PlayerUpdateDifficultyEvent;
declare class PlayerUpdateDifficultyEvent extends Event {
    cancelled: boolean;
    name: string;
    player: any;
    server: any;
    difficulty: any;
    execute(): any;
}
import Event = require("./Event");
