export = CommandVersion;
declare const CommandVersion_base: typeof import("./Command");
declare class CommandVersion extends CommandVersion_base {
    name(): any;
    aliases(): {};
    getPlayerDescription(): any;
    executePlayer(client: any): void;
}
