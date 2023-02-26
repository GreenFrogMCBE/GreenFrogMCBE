declare class Command {
  name(): string;
  aliases(): string[];
  execute(): void;
  getPlayerDescription(): string;
  executePlayer(): void;
}

export = Command;