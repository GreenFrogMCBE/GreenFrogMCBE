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
const ServerAvailableCommandsPacket = require("../network/packets/ServerAvailableCommandsPacket")

const { get_key } = require("../utils/Language")

/** @type {import("Frog").CommandInfo[]} */
const commands = []

module.exports = {
	/**
	 * Retrieves the commands packet of a client.
	 *
	 * @param {import("Frog").Player} client - The client object.
	 * @returns {import("Frog").CommandPacket}
	 */
	getPacket(client) {
		return client.commands
	},

	/**
	 * Initialises the commands.
	 *
	 * @param {import("Frog").Player} client
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
		}
	},

	/**
	 * Retrieves the commands array.
	 *
	 * @returns {import("Frog").CommandInfo[]}
	 */
	getCommands() {
		return commands
	},

	/**
	 * Adds a new command to the client's commands packet and updates the commands array.
	 *
	 * @param {import("Frog").Player} client
	 * @param {string} name - The name of the new command.
	 * @param {string} description - The description of the command.
	 * @param {{ name: string; type: 'int' | 'float' | 'value' | 'wildcard_int' | 'operator' | 'command_operator' | 'target' | 'wildcard_target' | 'file_path' | 'integer_range' | 'equipment_slot' | 'string' | 'block_position' | 'position' | 'message' | 'raw_text' | 'json' | 'block_states' | 'command'; optional: boolean; }[]} 
	 */
	addCommand(client, name, description, args) {
		if (name === get_key("commands.help.name") || name === "?") return // Ignore /help and /? because they are overridden by the client

		client.commands.command_data.push({
			name,
			description,
			flags: 0,
			permission_level: 0,
			alias: -1,
			chained_subcommand_offsets: [],
			overloads: [
				{
					chaining: false,
					parameters: args?.map((v) => {
						return {
							parameter_name: v.name,
							value_type: v.type,
							enum_type: "valid",
							optional: v.optional,
							options: {
								unused: 0,
								collapse_enum: 0,
								has_semantic_constraint: 0,
								as_chained_command: 0,
								unknown2: 0
							}
						}
					}) || [],
				}
			],
		})

		commands.push({
			name,
			description,
		})

		const availableCommandsPacket = new ServerAvailableCommandsPacket()
		availableCommandsPacket.data = client.commands
		availableCommandsPacket.write_packet(client)
	},
}
