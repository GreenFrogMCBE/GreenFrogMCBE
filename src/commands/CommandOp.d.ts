export = CommandOp;
declare const CommandOp_base: typeof import("./Command");
declare class CommandOp extends CommandOp_base {
    name(): any;
    execute(args: any): any;
    getPlayerDescription(): any;
    executePlayer(client: any, args: any): any;
}
