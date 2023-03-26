export = CommandTime;
declare const CommandTime_base: typeof import("./Command");
declare class CommandTime extends CommandTime_base {
    name(): any;
    getPlayerDescription(): any;
    execute(args: any): void;
    executePlayer(client: any, args: any): void;
}
