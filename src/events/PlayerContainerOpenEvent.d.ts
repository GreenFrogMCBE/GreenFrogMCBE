export = PlayerContainerOpenEvent;
declare class PlayerContainerOpenEvent extends Event {
    name: string;
    server: any;
    player: any;
    windowID: any;
    windowType: any;
    runtimeId: any;
    cancelled: boolean;
    coordinateX: number;
    coordinateY: number;
    coordinateZ: number;
    execute(): any;
}
import Event = require("./Event");
