/**
 * Sends a unknown command (or no permission) error to the command executor.
 *
 * @param {Client} commandExecutor
 * @param {string} command
 */
export function throwError(commandExecutor: Client, command: string): void;
