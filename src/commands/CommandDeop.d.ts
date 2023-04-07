export = CommandDeop;
declare const CommandDeop_base: typeof import("./Command");
declare class CommandDeop extends CommandDeop_base {
    name(): any;
    execute(args: any): any;
    getPlayerDescription(): any;
    executePlayer(client: any, args: any): any;
}
