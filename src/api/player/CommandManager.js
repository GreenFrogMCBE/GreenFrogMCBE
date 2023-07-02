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
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const AvailableCommands = require("../../network/packets/ServerAvailableCommandsPacket");

const { getKey } = require("../../utils/Language");

/**
 * @typedef {object} CommandsPacket - The commands packet.
 * @property {number} values_len - The length of the values.
 * @property {string} _enum_type - The type of the enum.
 * @property {Array} enum_values - The enum values.
 * @property {Array} suffixes - The suffixes.
 * @property {Array} enums - The enums.
 * @property {Array<CommandData>} command_data - The command data.
 * @property {Array} dynamic_enums - The dynamic enums.
 * @property {Array} enum_constraints - The enum constraints.
 */
let commands = [];

class CommandManager {
	/**
	 * Retrieves the commands packet of a client.
	 *
	 * @param {Client} client - The client object.
	 * @returns {CommandsPacket} The client's commands packet.
	 */
	getPacket(client) {
		return client.commands;
	}

	/**
	 * Initializes the commands.
	 *
	 * @param {Client} client - The client.
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

		const availableCommandsPacket = new AvailableCommands();
		availableCommandsPacket.data = client.commands;
		availableCommandsPacket.writePacket(client);
	}
}

module.exports = CommandManager;
