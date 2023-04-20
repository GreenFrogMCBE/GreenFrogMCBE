/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
export = CommandManager;
/** Manages commands */
declare class CommandManager {
	/**
	 * Retrieves the commands packet of a client.
	 *
	 * @param {Client} client - The client object.
	 * @returns {CommandsPacket} The client's commands packet.
	 */
	getPacket(client: Client): CommandsPacket;
	/**
	 * Initializes the commands.
	 *
	 * @param {Client} client - The client.
	 */
	init(client: Client): void;
	/**
	 * Retrieves the commands array.
	 *
	 * @returns {Array} The commands array.
	 */
	getCommands(): any[];
	/**
	 * Adds a new command to the client's commands packet and updates the commands array.
	 *
	 * @param {Client} client - The client.
	 * @param {string} name - The name of the new command.
	 * @param {string} description - The description of the command.
	 */
	addCommand(client: Client, name: string, description: string): void;
}
declare namespace CommandManager {
	export { CommandsPacket };
}
/**
 * - The commands packet.
 */
type CommandsPacket = {
	/**
	 * - The length of the values.
	 */
	values_len: number;
	/**
	 * - The type of the enum.
	 */
	_enum_type: string;
	/**
	 * - The enum values.
	 */
	enum_values: any[];
	/**
	 * - The suffixes.
	 */
	suffixes: any[];
	/**
	 * - The enums.
	 */
	enums: any[];
	/**
	 * - The command data.
	 */
	command_data: Array<CommandData>;
	/**
	 * - The dynamic enums.
	 */
	dynamic_enums: any[];
	/**
	 * - The enum constraints.
	 */
	enum_constraints: any[];
};
