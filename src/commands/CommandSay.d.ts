export = CommandSay;
declare const CommandSay_base: typeof import("./Command");
declare class CommandSay extends CommandSay_base {
    name(): any;
    execute(args: any): void;
    getPlayerDescription(): any;
    executePlayer(client: any, args: any): void;
}
