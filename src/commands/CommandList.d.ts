export = CommandList;
declare const CommandList_base: typeof import("./Command");
declare class CommandList extends CommandList_base {
    name(): any;
    execute(isconsole: boolean, client: any): void;
    getPlayerDescription(): any;
    executePlayer(client: any): void;
}
