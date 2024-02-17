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
const readline = require("readline")

const { Event, EventEmitter } = require("@kotinash/better-events")

const CommandProcessException = require("../utils/exceptions/CommandHandlingException")

const CommandManager = require("./CommandManager")

const CommandVerifier = require("../utils/CommandVerifier")
const Language = require("../utils/Language")
const Logger = require("../utils/Logger")

/**
 * Returns true if the console is closed, false otherwise.
 *
 * @type {boolean}
 */
const closed = false

module.exports = {
	/**
	 * Returns true if the console is closed, false otherwise.
	 *
	 * @returns {boolean}
	 */
	closed,

	/**
	 * Checks if the string is empty
	 *
	 * @param {string} string - The string to check
	 * @returns {boolean} If the string is empty
	 */
	is_empty(string) {
		return !string.trim()
	},

	/**
	 * Returns the string without the slash
	 *
	 * @param {string} string - The string that you want to remove slash from
	 * @returns {string} - The string without the / character
	 */
	remove_slash(string) {
		return string.replace("/", "")
	},

	/**
	 * Handles possible errors that can occur while executing a command
	 *
	 * @param {Error} error
	 * @param {string} command
	 */
	handle_command_error(error, command) {
		EventEmitter.emit(
			new Event(
				"serverCommandProcessError",
				{
					command,
					error,
				},
				(() => {
					Logger.error(
						Language.get_key("commands.errors.internalError", [error.stack])
					)
				})
			),
		)
	},

	/**
	 * Finds a command in `CommandManager.commands` and executes it
	 *
	 * @param {string} inputCommand
	 * @param {string[]} args
	 * @returns {boolean}
	 */
	find_command(inputCommand, args) {
		const Frog = require("../Frog")

		for (const command of CommandManager.commands) {
			if (
				command.name === inputCommand.split(" ")[0] ||
				(
					command.aliases &&
					command.aliases.includes(inputCommand.split(" ")[0])
				)
			) {
				if (command.min_args !== undefined && command.min_args > args.length) {
					Logger.info(
						Language.get_key("commands.errors.syntaxError.minArg", [
							command.min_args,
							args.length
						])
					)

					return true
				}

				if (command.max_args !== undefined && command.max_args < args.length) {
					Logger.info(
						Language.get_key("commands.errors.syntaxError.maxArg", [
							command.max_args,
							args.length
						])
					)

					return true
				}

				command.execute(Frog.as_player, Frog, args)

				return true
			}
		}

		return false
	},

	/**
	 * Executes a command.
	 *
	 * @param {string} command
	 */
	execute_command(command) {
		const args = command?.split(" ")?.slice(1)

		if (this.closed) {
			throw new CommandProcessException("Cannot execute a command when the console is closed")
		}

		EventEmitter.emit(
			new Event(
				"serverCommand",
				{
					command
				},
				(() => {
					try {
						const command_found = this.find_command(command, args)

						if (!command_found) {
							this.handle_invalid_command_error(command)
						}
					} catch (error) {
						this.handle_command_error(error, command)
					}
				})
			)
		)
	},

	/**
	 * Handles the case when an invalid command is entered.
	 *
	 * @param {string} command
	 */
	handle_invalid_command_error(command) {
		CommandVerifier.throw_error(
			{
				send_message: (message) => {
					Logger.info(message)
				},
			},
			command.split(" ")[0]
		)
	},

	/**
	 * Starts the console.
	 *
	 * @async
	 */
	async start() {
		const command_handler = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		})

		command_handler
			.setPrompt("")

		command_handler.on("line", (line) => {
			const command = this.remove_slash(line)

			if (this.is_empty(command)) return

			this.execute_command(command)
		})
	}
}
