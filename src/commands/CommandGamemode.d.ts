export = CommandGamemode;
declare class CommandGamemode extends Command {
    name(): any;
    getPlayerDescription(): any;
    executePlayer(client: any, gamemode: any): void;
}
import Command = require("./Command");
