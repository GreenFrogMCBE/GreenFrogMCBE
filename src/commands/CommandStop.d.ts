export = CommandShutdown;
declare const CommandShutdown_base: typeof import("./Command");
declare class CommandShutdown extends CommandShutdown_base {
    name(): any;
    getPlayerDescription(): any;
    executePlayer(client: any): void;
}
