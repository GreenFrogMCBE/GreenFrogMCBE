/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const ServerAvailableCommandsPacket = require("../network/packets/ServerAvailableCommandsPacket");

const { getKey } = require("../utils/Language");

/** @type {import("../declarations/Typedefs").CommandsPacket} */
let commands = [];

class CommandManager {
	/**
	 * Retrieves the commands packet of a client.
	 *
	 * @param {Client} client - The client object.
	 * @returns {Array}
	 */
	getPacket(client) {
		return client.commands;
	}

	/**
	 * Initialises the commands.
	 *
	 * @param {import("frog-protocol").Client} client
	 */
	init(client) {
		client.commands = {
			values_len: 0,
			_enum_type: "byte",
			enum_values: [],
			chained_subcommand_values: [],
			suffixes: [],
			enums: [],
			chained_subcommands: [],
			command_data: [],
			dynamic_enums: [],
			enum_constraints: [],
		};
	}

	/**
	 * Retrieves the commands array.
	 *
	 * @returns {Array} The commands array.
	 */
	getCommands() {
		return commands;
	}

	/**
	 * Adds a new command to the client's commands packet and updates the commands array.
	 *
	 * @param {Client} client - The client.
	 * @param {string} name - The name of the new command.
	 * @param {string} description - The description of the command.
	 */
	addCommand(client, name, description) {
		// Ignore /help and /? because they are overriden by the client
		if (name === getKey("commands.help.name") || name === "?") return;

		client.commands.command_data.push({
			name,
			description,
			"flags": 0,
			"permission_level": 0,
			"alias": -1,
			"chained_subcommand_offsets": [],
			"overloads": [
				{
					"chaining": false,
					"__4265": [
						{
							"parameter_name": "args",
							"value_type": "string",
							"enum_type": "valid",
							"optional": true,
							"options": {
								"unused": 0,
								"collapse_enum": 0,
								"has_semantic_constraint": 0,
								"as_chained_command": 0,
								"unknown2": 0
							}
						}
					]
				}
			]
		});

		commands.push({
			name,
			description,
		});

		const availableCommandsPacket = new ServerAvailableCommandsPacket();
		availableCommandsPacket.data = client.commands;
		availableCommandsPacket.writePacket(client);
	}
}

module.exports = CommandManager
