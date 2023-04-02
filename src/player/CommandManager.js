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
const AvailableCommands = require("../network/packets/ServerAvailableCommandsPacket");

let commands = [];

class CommandManager {
	/**
	 * Retrieves the commands packet of a client.
	 * @param {Object} client - The client object.
	 * @returns {Object} The client's commands packet.
	 */
	getPacket(client) {
		return client.commands;
	}

	/**
	 * Initializes the commands.
	 * @param {Object} client - The client.
	 */
	init(client) {
		client.commands = {
			values_len: 0,
			_enum_type: "byte",
			enum_values: [],
			suffixes: [],
			enums: [],
			command_data: [],
			dynamic_enums: [],
			enum_constraints: [],
		};
	}

	/**
	 * Retrieves the commands array.
	 * @returns {Array} The commands array.
	 */
	getCommands() {
		return commands;
	}

	/**
	 * Adds a new command to the client's commands packet and updates the commands array.
	 *
	 *  @param {Client} client - The client.
	 * @param {String} name - The name of the new command.
	 * @param {String} description - The description of the command.
	 */
	addCommand(client, name, description) {
		client.commands.command_data.push({
			name: name,
			description: description,
			flags: 0,
			permission_level: 0,
			alias: -1,
			overloads: [
				[
					{
						parameter_name: "args",
						value_type: "raw_text",
						enum_type: "valid",
						optional: true,
						options: {
							unused: 0,
							collapse_enum: 0,
							has_semantic_constraint: 0,
							as_chained_command: 0,
							unknown2: 0,
						},
					},
				],
			],
		});
		commands.push({
			name,
			description,
		});
		const availablecommands = new AvailableCommands();
		availablecommands.setData(client.commands);
		availablecommands.writePacket(client);
	}
}

module.exports = CommandManager;
