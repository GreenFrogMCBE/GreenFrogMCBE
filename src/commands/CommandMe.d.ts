export = CommandMe;
declare const CommandMe_base: typeof import("./Command");
declare class CommandMe extends CommandMe_base {
    name: () => any;
    execute(msg?: string, client?: {
        username: any;
    }): void;
    getPlayerDescription(): any;
    executePlayer(client: any, msg: any): void;
}
