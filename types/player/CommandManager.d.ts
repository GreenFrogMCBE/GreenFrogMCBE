declare class CommandManager {
  getPacket(client: any): any;
  init(client: any): void;
  getCommands(): Array<{ name: string; description: string }>;
  addCommand(client: any, name: string, description: string): void;
}