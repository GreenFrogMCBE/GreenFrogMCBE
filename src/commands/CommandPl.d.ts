export = CommandPl;
declare const CommandPl_base: typeof import("./Command");
declare class CommandPl extends CommandPl_base {
    name(): any;
    aliases(): {};
    getPlayerDescription(): any;
    executePlayer(player: any): void;
}
