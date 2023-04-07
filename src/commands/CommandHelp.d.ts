export = CommandHelp;
declare const CommandHelp_base: typeof import("./Command");
declare class CommandHelp extends CommandHelp_base {
    name(): any;
    aliases(): {};
}
