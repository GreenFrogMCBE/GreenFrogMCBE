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
declare class CommandManager {
	/**
	 * Retrieves the commands packet of a client.
	 * @param {Object} client - The client object.
	 * @returns {Object} The client's commands packet.
	 */
	getPacket(client: any): any;
	/**
	 * Initializes the commands.
	 * @param {Object} client - The client.
	 */
	init(client: any): void;
	/**
	 * Retrieves the commands array.
	 * @returns {Array} The commands array.
	 */
	getCommands(): Array;
	/**
	 * Adds a new command to the client's commands packet and updates the commands array.
	 * @param {Object} client - The client.
	 * @param {String} name - The name of the new command.
	 * @param {String} description - The description of the command.
	 */
	addCommand(client: any, name: string, description: string): void;
}
