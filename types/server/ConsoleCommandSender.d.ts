/** @private */
export let isClosed: boolean;
/** @private */
export let readLineInterface: any;
/**
 * Closes the console.
 *
 * @throws {ConsoleSetupException} - If the console is already closed
 */
export declare function close(): void;
/**
 * Executes a command that the user typed in the console.
 *
 * @param {string} executedCommand - The command to execute.
 * @throws {CommandHandlingException} Throws an error if the command is empty
 */
export declare function executeConsoleCommand(executedCommand: string): void;
/**
 * Checks if the command is empty
 * @param {string} command
 */
export declare function isEmpty(command: string): boolean;
/**
 * Starts the console.
 */
export declare function start(): Promise<void>;
