declare class Command {
    constructor();
  
    /**
     * Returns the command name
     * @returns {string} Command name
     */
    name(): string;
  
    /**
     * Returns the command aliases
     * @returns {string[]} Command aliases
     */
    aliases(): string[];
  
    /**
     * It executes the command as consolecommandsender
     */
    execute(): void;
  
    /**
     * Returns the command description for the AvailableCommands packet
     * @returns {string} Command description
     */
    getPlayerDescription(): string;
  
    /**
     * Executes the command as a player
     */
    executePlayer(): void;
  }
  
  export = Command;
  