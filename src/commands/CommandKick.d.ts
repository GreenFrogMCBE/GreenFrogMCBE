export = CommandKick;
declare const CommandKick_base: typeof import("./Command");
declare class CommandKick extends CommandKick_base {
    name(): any;
    getPlayerDescription(): any;
    execute(args: any): void;
    executePlayer(client: any, args: any): void;
}
